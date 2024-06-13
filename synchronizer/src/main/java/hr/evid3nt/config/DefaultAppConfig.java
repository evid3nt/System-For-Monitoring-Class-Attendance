package hr.evid3nt.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class DefaultAppConfig implements IAppConfig {
    private final Properties appProperties = new Properties();

    public DefaultAppConfig() {
        this("app.properties");
    }

    public DefaultAppConfig(String fileName) {
        // Expects file to be in resources folder
        try (InputStream is = this.getClass().getClassLoader().getResourceAsStream(fileName)) {
            if (is == null) {
                throw new RuntimeException("Provided application config file name does not exist.");
            }
            appProperties.load(is);
        } catch (IOException exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    @Override
    public String tbHost() {
        return appProperties.getProperty("tb.host");
    }

    @Override
    public int tbPort() {
        return Integer.parseInt(appProperties.getProperty("tb.port"));
    }

    @Override
    public String tbUsername() {
        return appProperties.getProperty("tb.username");
    }

    @Override
    public String tbPassword() {
        return appProperties.getProperty("tb.password");
    }

    @Override
    public int tbFetchPageSize() {
        return Integer.parseInt(appProperties.getProperty("tb.devices.fetch.page-size"));
    }

    @Override
    public String tbDeviceType() {
        return appProperties.getProperty("tb.devices.device-type");
    }

    @Override
    public String dbHost() {
        return appProperties.getProperty("db.host");
    }

    @Override
    public int dbPort() {
        return Integer.parseInt(appProperties.getProperty("db.port"));
    }

    @Override
    public String dbUsername() {
        return appProperties.getProperty("db.username");
    }

    public String dbPassword() {
        return appProperties.getProperty("db.password");
    }

    @Override
    public String dbName() {
        return appProperties.getProperty("db.name");
    }

    @Override
    public int poolSize() {
        return Integer.parseInt(appProperties.getProperty("app.pool.size"));
    }

    @Override
    public String env() {
        return appProperties.getProperty("app.env");
    }

    @Override
    public String loggerConfig() {
        return appProperties.getProperty("app.logger.config");
    }

    @Override
    public int syncTaskRepeatInterval() {
        return Integer.parseInt(appProperties.getProperty("app.sync-task.repeat-interval"));
    }

    @Override
    public int syncTaskSyncInterval() {
        return Integer.parseInt(appProperties.getProperty("app.sync-task.sync-interval"));
    }
}
