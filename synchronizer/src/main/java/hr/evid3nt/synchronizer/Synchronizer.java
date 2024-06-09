package hr.evid3nt.synchronizer;

import hr.evid3nt.config.IAppConfig;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Synchronizer {
    private final IAppConfig appConfig;
    private static final Logger logger = LogManager.getLogger(Synchronizer.class);

    private Synchronizer(IAppConfig appConfig) {
        this.appConfig = appConfig;

        logger.info("App successfully configured.");
    }

    public void setup() {
        logger.info("Starting with setup.");
    }

    public void loop() {
        logger.info("Starting with loop.");
    }

    public static Synchronizer of(IAppConfig appConfig) {
        return new Synchronizer(appConfig);
    }
}
