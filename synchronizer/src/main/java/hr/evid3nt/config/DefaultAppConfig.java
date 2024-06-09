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

    private String formatString(String s) {
        // Removes double quotes from the start and the end
        return s.substring(1, s.length() - 1);
    }

    @Override
    public String tbHost() {
        return formatString(appProperties.getProperty("tb.host"));
    }

    @Override
    public int tbPort() {
        return Integer.parseInt(appProperties.getProperty("tb.port"));
    }

    @Override
    public String tbUsername() {
        return formatString(appProperties.getProperty("tb.username"));
    }

    @Override
    public String tbPassword() {
        return formatString(appProperties.getProperty("tb.password"));
    }

    @Override
    public String dbHost() {
        return formatString(appProperties.getProperty("db.host"));
    }

    @Override
    public int dbPort() {
        return Integer.parseInt(appProperties.getProperty("db.port"));
    }

    @Override
    public String dbName() {
        return formatString(appProperties.getProperty("db.name"));
    }

    @Override
    public int poolSize() {
        return Integer.parseInt(appProperties.getProperty("app.pool.size"));
    }

    @Override
    public String env() {
        return formatString(appProperties.getProperty("app.env"));
    }

    @Override
    public String loggerConfig() {
        return formatString(appProperties.getProperty("app.logger.config"));
    }
}
