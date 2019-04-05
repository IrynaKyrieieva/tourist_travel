namespace TouristTravel.Services.Models
{
    public class ChangePasswordData
    {
        public int AccountId { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}
