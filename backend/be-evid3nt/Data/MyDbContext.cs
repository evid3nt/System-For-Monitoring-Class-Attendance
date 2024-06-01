using be_evid3nt.Models;
using Microsoft.EntityFrameworkCore;

namespace be_evid3nt.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Lecture> Lectures { get; set; }
        public DbSet<Telemetry> Telemetrys { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UsersCourse> UsersCourses { get; set; }

    }
}
