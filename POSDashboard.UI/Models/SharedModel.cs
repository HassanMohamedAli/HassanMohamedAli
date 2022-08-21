using POSDashboard.Business.BE;
using POSDashboard.Business.BLL.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace POSDashboard.UI.Models
{
    public class SharedModel : BaseModel
    {
       

        #region Error Log

       

        #endregion

        #region Screen Language

        public List<Definitions.ScreenLanguage> GetScreenLanguage(Definitions.ModuleNames screenName, int lang)
        {

            var objLang = new ScreenLanguage();
            //  Get data
            DataTable dtLanguage = objLang.GetScreenLanguage(screenName.ToString(), lang);

            var lstLanguage = (from DataRow dr in dtLanguage.Rows
                               select new Definitions.ScreenLanguage()
                               {
                                   ControlID = dr["CONTROL_ID"].ToString(),
                                  
                                   ControlDesc = dr["CONTROL_DESC"].ToString()
                                   
                               }).ToList();

            return lstLanguage;
        }

        #endregion


       


        #region Grid Setting


     

        #endregion

        #region Get server date
        public static string GetServerDate(int addedDays = 0)
        {
            return DateTime.Now.AddDays(addedDays).ToString("dd/MM/yyyy");
        }

     
        #endregion

        #region System Task


        #endregion


        

    }
}