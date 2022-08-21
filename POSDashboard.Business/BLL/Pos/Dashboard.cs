using MyGeneration.dOOdads;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSDashboard.Business.BLL.Pos
{
  public  class Dashboard : SqlClientEntity
    {
        public DataTable GetPeriodType( int Lang)
        {
            ListDictionary parameters = new ListDictionary();
         
            parameters.Add(new SqlParameter("@PARAM_LANG", SqlDbType.NVarChar), Lang);

            base.LoadFromSql("SP_PERIOD_TYPE_GET", parameters);
            return DefaultView.Table;
        }
    }
}
