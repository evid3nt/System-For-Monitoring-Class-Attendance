package hr.evid3nt.dao;

import hr.evid3nt.db.DB;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.UUID;

public class UsersDAO {
    private static final Logger logger = LogManager.getLogger(UsersDAO.class);

    public static UUID getIdFromCardId(String cardId) {
        String sql = """
                SELECT "Id" from "Users" WHERE "CardId" = ?;
                """;
        UUID uuid = null;

        try (Connection connection = DB.getInstance().connect()) {
            PreparedStatement statement = connection.prepareStatement(sql);

            statement.setString(1, cardId);

            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                uuid = UUID.fromString(resultSet.getString("Id"));
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
        }

        return uuid;
    }
}
