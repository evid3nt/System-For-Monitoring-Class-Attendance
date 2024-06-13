package hr.evid3nt.domain;

import java.time.Instant;
import java.util.UUID;

public record Telemetry(UUID id, Instant scanTime, UUID userId, UUID classroomId) {

    public static Telemetry of(Instant scanTime, UUID userId, UUID classroomId) {
        return new Telemetry(
                UUID.randomUUID(),
                scanTime,
                userId,
                classroomId
        );
    }

    @Override
    public String toString() {
        return "Telemetry{" +
                "id=" + id +
                ", scanTime=" + scanTime +
                ", userId=" + userId +
                ", classroomId=" + classroomId +
                '}';
    }
}
