using POSDashboard.Business.BE;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace POSDashboard.UI.Controllers.Components
{
    public class SessionComponent : IRequiresSessionState
    {
        /// <summary>
        /// Set user information when login to session varaibale, for defined user info structure
        /// </summary>
        /// <param name="userInfo"></param>
        /// 
        public static void SetUserInfo(Definitions.LoggedUserInfo userInfo)
        {
            HttpContext.Current.Session["CurrentUser"] = userInfo;
        }



        public static void ClearAllSession()
        {
            HttpContext.Current.Session.RemoveAll();
        }
        /// <summary>
        /// Get user information from global session varibale, for defined user info structure
        /// </summary>
        /// <returns></returns>
        public static Definitions.LoggedUserInfo GetUserInfo()
        {

            if (HttpContext.Current.Session["CurrentUser"] != null)
            {
                return (Definitions.LoggedUserInfo)HttpContext.Current.Session["CurrentUser"];
            }

            HttpContext.Current.Session.RemoveAll();

            throw new SharedComponent.SessionTimeOut("SessionTimeOut");
        }

        public static string GetUserName()
        {
            if (HttpContext.Current.Session["CurrentUser"] != null)
            {
                return SessionComponent.GetUserInfo().UserFullName;
            }

            return "";
        }


        /// <summary>
        /// Set language information when login to session varaibale, for defined language info structure
        /// </summary>
        /// <param name="lang"></param>
        public static void SetLanguage(int lang)
        {
            HttpContext.Current.Session["SystemLanguage"] = lang;
        }

        /// <summary>
        /// Get language from global session varibale, for defined language structure
        /// </summary>
        /// <returns></returns>
        public static int GetLanguage()
        {
            if (HttpContext.Current.Session["SystemLanguage"] == null)
            {
                HttpContext.Current.Session["SystemLanguage"] = ConfigurationManager.AppSettings["Language"];
            }

            return Convert.ToInt32(HttpContext.Current.Session["SystemLanguage"]);
        }

        public static string GetCurrentPage()
        {
            if (HttpContext.Current.Session["CurrentUrl"] == null)
            {
                HttpContext.Current.Session["CurrentUrl"] = string.Empty;
            }

            return Convert.ToString(HttpContext.Current.Session["CurrentUrl"]);
        }

        public static void SetCurrentPage(string currentUrl)
        {
            HttpContext.Current.Session["CurrentUrl"] = currentUrl;
        }

        public static void SetUserMenu(List<Definitions.UserMenu> lstUserMenu)
        {
            HttpContext.Current.Session["UserMenu"] = lstUserMenu;
        }


        public static List<Definitions.UserMenu> GetUserMenu()
        {
            if (HttpContext.Current.Session["UserMenu"] != null)
            {
                return (List<Definitions.UserMenu>)HttpContext.Current.Session["UserMenu"];
            }

            return new List<Definitions.UserMenu>();
        }


        #region Location Set & Get
        public static void SetLocation(int loactionId)
        {
            HttpContext.Current.Session["UserLocation"] = loactionId;
        }

        public static int GetLocation()
        {
            return Convert.ToInt32(HttpContext.Current.Session["UserLocation"]);
        }

        public static void SetLocationTypeId(int locationTypeId)
        {
            HttpContext.Current.Session["UserLocationTypeId"] = locationTypeId;
        }
        public static int GetLocationTypeId()
        {
            return Convert.ToInt32(HttpContext.Current.Session["UserLocationTypeId"]);
        }
        #endregion

    }
}