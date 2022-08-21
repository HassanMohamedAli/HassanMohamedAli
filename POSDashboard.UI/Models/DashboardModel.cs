using POSDashboard.Business.BE;
using POSDashboard.Business.BLL.Pos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace POSDashboard.UI.Models
{
    public class DashboardModel
    {
        internal List<Definitions.GenericList> GetPaymentTypesList(int lang)
        {
            DataTable dtTypes = new Dashboard().GetPeriodType(lang);

            var lstTypes = new List<Definitions.GenericList>()
            {
                new Definitions.GenericList
                {
                    Id  = 0,
                    Name = TemplateModel.GetTemplate(resourceKey: "Select", lang: lang)
                }
            };

            lstTypes.AddRange(from DataRow dr in dtTypes.Rows
                                    select new Definitions.GenericList
                                    {
                                        Id = Convert.ToInt32(dr["Id"]),
                                        Name =  dr["PERIOD_NAME"].ToString() 
                                    });


            return lstTypes;
        }
    }
}