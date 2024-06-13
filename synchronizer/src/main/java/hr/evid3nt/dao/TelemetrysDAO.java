package hr.evid3nt.dao;

import hr.evid3nt.db.DB;
import hr.evid3nt.domain.Telemetry;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.postgresql.util.PSQLException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Timestamp;

public class TelemetrysDAO {
    private static final Logger logger = LogManager.getLogger(TelemetrysDAO.class);

    public static void insert(Telemetry telemetry) {
        String sql = """
                INSERT INTO "Telemetrys" ("Id", "ScanTime", "UserId", "ClassroomId")
                VALUES (?::uuid, ?, ?::uuid, ?::uuid);
                """;

        try (Connection connection = DB.getInstance().connect()) {
            PreparedStatement statement = connection.prepareStatement(sql);

            statement.setString(1, telemetry.id().toString());
            statement.setTimestamp(2, Timestamp.from(telemetry.scanTime()));
            statement.setString(3, telemetry.userId().toString());
            statement.setString(4, telemetry.classroomId().toString());

            int result = statement.executeUpdate();
            logger.info(String.format(
                    "[SUCCESS] Insert telemetry %s finished with result: %d",
                    telemetry, result
            ));
        } catch (PSQLException exception) {
            logger.warn(exception.getMessage());
        } catch (Exception exception) {
            logger.error(exception.getMessage());
        }
    }
}
