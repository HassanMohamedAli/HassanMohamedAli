using MyGeneration.dOOdads;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace POSDashboard.UI.Models
{
    public class BaseModel
    {
        /// <summary>
        /// connection string 
        /// </summary>
        private string ConStr;

        /// <summary>
        /// constructor, sets the value of pikeConStr
        /// </summary>
        public BaseModel()
        {
            ConStr = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            BusinessEntity.DefaultConnectionString = ConStr;
        }

    }
}