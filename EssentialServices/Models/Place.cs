using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EssentialServices.Models
{
    public class Place
    {
        [BsonId(IdGenerator = typeof(CombGuidGenerator))]
        public Guid Id { get; set; }

        public string OwnerId { get; set; }


        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Type")]
        public string Type { get; set; }

        [BsonElement("Address")]
        public string Address { get; set; }

        [BsonElement("Coordinates")]
        public Coordinates Coordinates { get; set; }

        [BsonElement("Hours")]
        public Hours Hours { get; set; }

        [BsonElement("PhoneNumber")]
        public string PhoneNumber { get; set; }

        [BsonElement("EmailAddress")]
        public string EmailAddress { get; set; }

        [BsonElement("Notes")]
        public string Notes { get; set; }

        [BsonElement("SocialMedia")]
        public IList<string> SocialMedia { get; set; }

        [BsonElement("Options")]
        public Options Options { get; set; }
    }

    public class Coordinates
    {
        public float Lat { get; set; }
        public float Lng { get; set; }
    }

    public class Hours
    {
        public OpenCloseTimes Saturday { get; set; }
        public OpenCloseTimes Sunday { get; set; }
        public OpenCloseTimes Monday { get; set; }
        public OpenCloseTimes Tuesday { get; set; }
        public OpenCloseTimes Wednesday { get; set; }
        public OpenCloseTimes Thursday { get; set; }
        public OpenCloseTimes Friday { get; set; }
    }

    public class OpenCloseTimes
    {
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
    }

    public class Options
    {
        public bool Delivery { get; set; }
        public bool CurbsidePickup { get; set; }
    }
}
