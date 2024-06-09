package hr.evid3nt;

import hr.evid3nt.config.DefaultAppConfig;
import hr.evid3nt.config.IAppConfig;
import hr.evid3nt.synchronizer.Synchronizer;

public class Main {

    public static void main(String[] args) {
        // Config service
        String appConfigFileName = args.length > 0 ? args[0] : "app.properties";
        IAppConfig appConfig = configure(appConfigFileName);

        // Create and run service
        Synchronizer synchronizer = Synchronizer.of(appConfig);
        synchronizer.setup();
        synchronizer.loop();
    }

    private static IAppConfig configure(String configFileName) {
        IAppConfig appConfig = new DefaultAppConfig(configFileName);
        System.setProperty("log4j.configurationFile", appConfig.loggerConfig());
        return appConfig;
    }

}