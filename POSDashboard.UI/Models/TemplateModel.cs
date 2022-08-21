using POSDashboard.Business.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Web;

namespace POSDashboard.UI.Models
{
    public class TemplateModel
    {
        public static string GetTemplate(string resourceKey, int lang)
        {
            string resourceValue;

            try
            {
                ResourceManager rm = null;

                if (lang == (int)Definitions.Language.Arabic)
                {
                    rm = Templates.POS_ar.ResourceManager;
                }
                else
                {
                    rm = Templates.POS_en.ResourceManager;
                }


                // The value of ci will determine the culture of
                // the resources that the resource manager retrieves.                 
                resourceValue = rm.GetString(resourceKey);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return resourceValue;
        }
    }
}