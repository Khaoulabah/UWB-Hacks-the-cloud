using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EssentialServices.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EssentialServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceController : ControllerBase
    {
        private Dal dal;

        public PlaceController()
        {
            dal = new Dal();
        }

        // GET: api/Place
        [HttpGet]
        public IEnumerable<Place> Get()
        {
            return dal.GetAllPlaces();
        }

        // GET: api/Place/groceryStore
        [HttpGet("{type}", Name = "Get")]
        public IEnumerable<Place> Get(string type)
        {
            return dal.GetAllPlacesByType(type);
        }

        // PUT: api/Place/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
