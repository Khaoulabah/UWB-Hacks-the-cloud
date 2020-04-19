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
    public class MyPlaceController : ControllerBase
    {
        private Dal dal;

        public MyPlaceController()
        {
            dal = new Dal();
        }

        // GET: api/MyPlace/5
        [HttpGet("{ownerId}", Name = "GetByOwner`")]
        public IEnumerable<Place> Get(string ownerId)
        {
            return dal.GetAllPlacesByOwner(ownerId);
        }


        // POST: api/MyPlace
        [HttpPost]
        public void Post([FromBody] Place place)
        {
            dal.CreatePlace(place);
        }

        // PUT: api/MyPlace
        [HttpPut]
        public void Put([FromBody] Place place)
        {
            dal.UpdatePlace(place);
        }

        // DELETE: api/MyPlace/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            dal.DeletePlace(id);
        }
    }
}
