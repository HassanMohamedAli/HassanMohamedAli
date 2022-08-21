using POSDashboard.Business.BE;
using POSDashboard.UI.Controllers.Components;
using POSDashboard.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace POSDashboard.UI.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index(int lang = 1)
        {

            SessionComponent.SetLanguage(lang);
            ViewBag.ScreenLanguage = new SharedModel().GetScreenLanguage(Definitions.ModuleNames.Index, lang);
            ViewBag.PeriodTypes = new DashboardModel().GetPaymentTypesList(lang);
            return View();
        }
    }
}