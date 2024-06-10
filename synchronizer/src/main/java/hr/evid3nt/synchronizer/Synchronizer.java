package hr.evid3nt.synchronizer;

import hr.evid3nt.config.IAppConfig;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.thingsboard.rest.client.RestClient;
import org.thingsboard.server.common.data.Device;
import org.thingsboard.server.common.data.id.DeviceId;
import org.thingsboard.server.common.data.kv.TsKvEntry;
import org.thingsboard.server.common.data.page.PageData;
import org.thingsboard.server.common.data.page.PageLink;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Synchronizer implements Runnable, AutoCloseable {
    private static final Logger logger = LogManager.getLogger(Synchronizer.class);
    private final IAppConfig appConfig;
    private final ScheduledExecutorService scheduleService;
    private final ExecutorService executorService;
    private final RestClient tbRestClient;
    private final Map<DeviceId, Device> deviceMap = new HashMap<>();


    private Synchronizer(IAppConfig appConfig) {
        this.appConfig = appConfig;

        // Setup schedule service
        scheduleService = Executors.newSingleThreadScheduledExecutor();

        // Setup executor service
        executorService = Executors.newFixedThreadPool(appConfig.poolSize());

        // Setup ThingsBoard REST client
        tbRestClient = new RestClient(String.format("http://%s:%d", appConfig.tbHost(), appConfig.tbPort()));

        logger.info("App successfully configured.");
    }

    public static Synchronizer of(IAppConfig appConfig) {
        return new Synchronizer(appConfig);
    }

    public void setup() {
        logger.info("Starting with setup.");

        tbRestClient.login(appConfig.tbUsername(), appConfig.tbPassword());
        tbRestClient.getUser().ifPresent(user -> logger.debug(String.format("Current user: %s", user)));

        getTenantDevices();

        scheduleService.scheduleAtFixedRate(this, 0, 15, TimeUnit.SECONDS);
    }

    public void loop() {
        logger.info("Starting with loop.");

        Thread shutdownHook = new Thread(this::close);
        Runtime.getRuntime().addShutdownHook(shutdownHook);

        while (true) {
            try {
                shutdownHook.join();
            } catch (InterruptedException ignore) {}
        }
    }

    @Override
    public void run() {
        logger.info("Starting with telemetry synchronization...");

        // Create tasks for each device
        for (Device device : deviceMap.values()) {
            executorService.submit(new SyncDeviceTelemetry(device));
        }
    }

    @Override
    public void close() {
        logger.info("Closing synchronization service...");

        try {
            scheduleService.close();
        } catch (Exception ignore) {
            logger.warn("Unable to close executor service - is resource already closed?");
        }

        try {
            tbRestClient.logout();
            tbRestClient.close();
        } catch (Exception ignore) {
                logger.warn("Unable to close ThingsBoard client - is resource already closed?");
        }

        logger.info("All resources are cleared.");
    }

    private void getTenantDevices() {
        logger.info("Fetching tenant devices...");
        PageData<Device> tenantDevices;
        PageLink pageLink = new PageLink(appConfig.tbFetchPageSize());
        do {
            // Fetch all tenant devices using current page link
            tenantDevices = tbRestClient.getTenantDevices(appConfig.tbDeviceType(), pageLink);
            tenantDevices.getData().forEach(device -> deviceMap.put(device.getId(), device));
            pageLink = pageLink.nextPageLink();
        } while (tenantDevices.hasNext());
        logger.info(String.format("Number of fetched tenant devices: %d", deviceMap.size()));
    }

    private class SyncDeviceTelemetry implements Runnable {
        private final Device device;

        public SyncDeviceTelemetry(Device device) {
            this.device = device;
        }

        @Override
        public void run() {
            // TODO: Timezones! (hardcoded to +2)
            long startTs = LocalDateTime.now().minusSeconds(15).toEpochSecond(ZoneOffset.ofHours(2)) * 1000;
            long endTs = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(2)) * 1000;

            List<TsKvEntry> telemetry = tbRestClient.getTimeseries(
                device.getId(),
                List.of("cardId", "classroom"),
                null,
                null,
                null,
                startTs,
                endTs,
                null,
                false
            );

            if (!telemetry.isEmpty()) {
                logger.debug(String.format(
                        "Device: %s. Received telemetry data: %s.",
                        device.getName(), telemetry
                ));
            }
        }
    }
}
