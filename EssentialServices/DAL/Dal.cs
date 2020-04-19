using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EssentialServices.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Configuration;
using System.Security.Authentication;

namespace EssentialServices
{
    public class Dal : IDisposable
    {
        //private MongoServer mongoServer = null;
        private bool disposed = false;

        // To do: update the connection string with the DNS name
        // or IP address of your server. 
        //For example, "mongodb://testlinux.cloudapp.net
        private string userName = "essentialservicesdb";
        private string host = "essentialservicesdb.mongo.cosmos.azure.com";
        private string password = "iDjzYpyDcH5TY2zcNlvoAKbiYc3FePKs0On5ojaZVkAkh2Ywn6MwbDf7cIpyJ5jCJU5ijdP4Nl6OqYAoV1ZA3w==";

        // This sample uses a database named "Places" and a 
        //collection named "PlacesList".  The database and collection 
        //will be automatically created if they don't already exist.
        private string dbName = "Places";
        private string collectionName = "PlacesList";

        // Default constructor.        
        public Dal()
        {
        }

        // Gets all Place items from the MongoDB server.        
        public List<Place> GetAllPlaces()
        {
            try
            {
                var collection = GetPlacesCollection();
                return collection.Find(new BsonDocument()).ToList();
            }
            catch (MongoConnectionException)
            {
                return new List<Place>();
            }
        }

        // Gets all Place items filtered by type from the MongoDB server.        
        public List<Place> GetAllPlacesByType(string type)
        {
            try
            {
                var collection = GetPlacesCollection();
                var filter = Builders<Place>.Filter.Eq("Type", type);
                var result = collection.Find(filter).ToList();
                return result;
            }
            catch (MongoConnectionException)
            {
                return new List<Place>();
            }
        }

        // Gets all Place items filtered by type from the MongoDB server.        
        public List<Place> GetAllPlacesByOwner(string ownerId)
        {
            try
            {
                var collection = GetPlacesCollection();
                var filter = Builders<Place>.Filter.Eq("OwnerId", ownerId);
                var result = collection.Find(filter).ToList();
                return result;
            }
            catch (MongoConnectionException)
            {
                return new List<Place>();
            }
        }

        // Creates a Place and inserts it into the collection in MongoDB.
        public void CreatePlace(Place place)
        {
            var collection = GetPlacesCollectionForEdit();
            try
            {
                collection.InsertOne(place);
            }
            catch (MongoCommandException ex)
            {
                string msg = ex.Message;
            }
        }
        public void UpdatePlace(Place place)
        {
            var collection = GetPlacesCollectionForEdit();
            try
            {
                collection.ReplaceOne(Builders<Place>.Filter.Eq("Id", place.Id), place);
            }
            catch (MongoCommandException ex)
            {
                string msg = ex.Message;
            }
        }

        public void DeletePlace(Guid placeId)
        {
            var collection = GetPlacesCollectionForEdit();
            try
            {
                collection.DeleteOne(Builders<Place>.Filter.Eq("Id", placeId));
            }
            catch (MongoCommandException ex)
            {
                string msg = ex.Message;
            }
        }

        private IMongoCollection<Place> GetPlacesCollection()
        {
            MongoClientSettings settings = new MongoClientSettings();
            settings.Server = new MongoServerAddress(host, 10255);
            settings.UseTls = true;
            settings.SslSettings = new SslSettings();
            settings.SslSettings.EnabledSslProtocols = SslProtocols.Tls12;

            MongoIdentity identity = new MongoInternalIdentity(dbName, userName);
            MongoIdentityEvidence evidence = new PasswordEvidence(password);

            settings.Credential = new MongoCredential("SCRAM-SHA-1", identity, evidence);

            MongoClient client = new MongoClient(settings);
            var database = client.GetDatabase(dbName);
            var todoPlaceCollection = database.GetCollection<Place>(collectionName);
            return todoPlaceCollection;
        }

        private IMongoCollection<Place> GetPlacesCollectionForEdit()
        {
            MongoClientSettings settings = new MongoClientSettings();
            settings.Server = new MongoServerAddress(host, 10255);
            settings.UseTls = true;
            settings.SslSettings = new SslSettings();
            settings.SslSettings.EnabledSslProtocols = SslProtocols.Tls12;
            settings.RetryWrites = false;

            MongoIdentity identity = new MongoInternalIdentity(dbName, userName);
            MongoIdentityEvidence evidence = new PasswordEvidence(password);

            settings.Credential = new MongoCredential("SCRAM-SHA-1", identity, evidence);
            
            MongoClient client = new MongoClient(settings);
            var database = client.GetDatabase(dbName);
            var todoPlaceCollection = database.GetCollection<Place>(collectionName);
            return todoPlaceCollection;
        }

        # region IDisposable

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                }
            }

            this.disposed = true;
        }

        # endregion
    }
}
