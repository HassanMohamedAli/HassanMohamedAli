using MyGeneration.dOOdads;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSDashboard.Business.BLL.Common
{
    public class ScreenLanguage : SqlClientEntity
    {
        public DataTable GetScreenLanguage(string ScreenId, int Lang)
        {
            ListDictionary parameters = new ListDictionary();
            parameters.Add(new SqlParameter("@PARAM_SCREEN_ID", SqlDbType.NVarChar), ScreenId);
            parameters.Add(new SqlParameter("@PARAM_LANG_ID", SqlDbType.NVarChar), Lang);

            base.LoadFromSql("SP_LANGUAGE_SUPPORT_GET", parameters);
            return DefaultView.Table;
        }
    }
}
