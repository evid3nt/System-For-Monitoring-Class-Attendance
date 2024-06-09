package hr.evid3nt.synchronizer;

import hr.evid3nt.config.IAppConfig;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.thingsboard.rest.client.RestClient;
import org.thingsboard.server.common.data.Device;
import org.thingsboard.server.common.data.id.DeviceId;
import org.thingsboard.server.common.data.page.PageData;
import org.thingsboard.server.common.data.page.PageLink;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Synchronizer implements AutoCloseable {
    private static final Logger logger = LogManager.getLogger(Synchronizer.class);
    private final IAppConfig appConfig;
    private final ExecutorService executorService;
    private final RestClient tbRestClient;
    private final Map<DeviceId, Device> deviceMap = new HashMap<>();

    private Synchronizer(IAppConfig appConfig) {
        this.appConfig = appConfig;

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
    }

    public void loop() {
        logger.info("Starting with loop.");
    }

    @Override
    public void close() throws Exception {
        logger.info("Closing synchronization service...");
        executorService.close();
        tbRestClient.logout();
        tbRestClient.close();
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
}
