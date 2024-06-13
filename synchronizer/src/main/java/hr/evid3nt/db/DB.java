package hr.evid3nt.db;

import hr.evid3nt.config.IAppConfig;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DB {
    private static final Logger logger = LogManager.getLogger(DB.class);
    private static DB instance;
    private final String jdbcUrl;
    private final String username;
    private final String password;

    private DB(IAppConfig appConfig) {
        jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", appConfig.dbHost(), appConfig.dbPort(), appConfig.dbName());
        username = appConfig.dbUsername();
        password = appConfig.dbPassword();
    }

    public static DB getInstance() {
        if (instance == null) {
            logger.warn("DB instance not initialized.");
            throw new IllegalStateException("DB instance not initialized.");
        }
        return instance;
    }

    public static void of(IAppConfig appConfig) {
        if (instance == null) {
            instance = new DB(appConfig);
        }
    }

    public Connection connect() throws SQLException {
        // Open a connection
        logger.debug("Opening database connection...");
        return DriverManager.getConnection(jdbcUrl, username, password);
    }
}
