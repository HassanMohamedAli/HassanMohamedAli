using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSDashboard.Business.BE
{
    public class Definitions
    {
        #region Structs
        [Serializable()]
        public struct SessionOutcomming
        {
            public LoggedUserInfo loggedUserInfo;
            public GenericList Location;
            public int langId;
        }
        [Serializable()]

        public struct LoggedUserInfo
        {
            public int UserID;
            public string LoginName;
            public string UserFullName;
            public int UserTypeID;
        }

        public struct BEUserRights
        {
            public int CanViewUnitCost;
        }

        public struct ScreenLanguage
        {
            public string ControlID;
            public string GridColID;
            public string ControlDesc;
            public string SystemDefination;
        }

        public struct GridDetailsStructure
        {
            public string ColumnName { get; set; }
            public string ColumnType { get; set; }
            public string ArabicTitle { get; set; }
            public string EnglishTitle { get; set; }
            public int ColumnWidth { get; set; }
            public bool Hidden { get; set; }
            public string GridId { get; set; }
            public int GridWidth { get; set; }
            public int GridHeight { get; set; }
            public string GridCaption { get; set; }
            public string Title { get; set; }
            public bool Sortable { get; set; }
            public bool Search { get; set; }
            public string SortType { get; set; }
            public bool Editable { get; set; }
            public string Align { get; set; }
        }

        public struct UserMenu
        {
            public string NodeID;
            public string NodeParentID;
            public string NodeDescEnglish;
            public string NodeDescArabic;
            public string IsLeaf;
            public string NodeLink;
            public string NodeDesc;
            public int RightId { get; set; }
        }

        public enum ToolbarActions
        {

            Insert = 1,
            Update = 2,
            Cancel = 4,
            Post = 5,
            CancelPost = 6,
            Print = 7,
            ChequePrint = 9,
            Copy = 10

        }
        public class CostCenterItem
        {
            public string title { get; set; }
            public string key { get; set; }
            public bool isLazy { get; set; }
            public int level { get; set; }
            public string url { get; set; }
            public bool isFolder { get; set; }
            public int ParentId { get; set; }
            public int Index { get; set; }
            public int SettingId { get; set; }
            public int CompanyId { get; set; }
            public List<CostCenterItem> children { get; set; }
        }

        public class ChartOfAccountItem
        {
            public string title { get; set; }
            public string key { get; set; }
            public bool isLazy { get; set; }
            public int level { get; set; }
            public string url { get; set; }
            public bool isFolder { get; set; }
            public int ParentId { get; set; }
            public int Index { get; set; }
            public int SettingId { get; set; }
            public int CompanyId { get; set; }
            public int ACCOUNT_SUB_TYPE_ID { get; set; }
            public int DETAILS_MODE_ID { get; set; }
            public List<ChartOfAccountItem> children { get; set; }
        }

        public class CategoryItem
        {
            public string title { get; set; }
            public string key { get; set; }
            public bool isLazy { get; set; }
            public int level { get; set; }
            public string url { get; set; }
            public bool isFolder { get; set; }
            public int ParentId { get; set; }
            public int Index { get; set; }
            public int SettingId { get; set; }
            public List<CategoryItem> children { get; set; }
        }

        public class AccountSettingItem
        {
            public string title { get; set; }
            public string key { get; set; }
            public bool isLazy { get; set; }
            public int level { get; set; }
            public string url { get; set; }
            public bool isFolder { get; set; }
            public int internalId { get; set; }
            public int Index { get; set; }

            public List<AccountSettingItem> children { get; set; }
        }

        public struct ReportFields
        {
            public string FieldName { get; set; }
            public string FieldType { get; set; }
            public string FieldValue { get; set; }
            public string FieldValue_To { get; set; }
            public int ParamType { get; set; }
            public bool DisplayHeader { get; set; }
            public string Operator { get; set; }
            public string Sort { get; set; }
        }

        //NAIEM SCOPE BEGIN 27042017
        public struct HeaderFields
        {
            public string DateFrom { get; set; }
            public string DateTo { get; set; }
            public string PeriodFieldName { get; set; }
            public int SuppId { get; set; }
            public string rptPeriod { get; set; }
            public string userName { get; set; }
            public string rLanguage { get; set; }
            public string company_e1 { get; set; }
            public string company_e2 { get; set; }
            public string company_e3 { get; set; }
            public string company1 { get; set; }
            public string company2 { get; set; }
            public string company3 { get; set; }
            public string companyLogo { get; set; }


        }
        //NAIEM SCOPE END 27042017

        public struct JQGridRow
        {
            public int id;
            public string[] cell;
        }

        public struct JQGridResults
        {
            public int page;
            public int total;
            public int records;
            public JQGridRow[] rows;

        }

        public struct JQGridFilterBasic
        {
            public string groupOp;
            public List<JQGridFilter> rules;
        }

        public struct JQGridFilter
        {
            public string field;
            public string op;
            public string data;
        }

        public struct WfScreenStatus
        {
            public string screenTitle;
            public byte canPost;
            public byte canSave;
            public byte canCancel;
            public byte canPrint;
            public byte transStatus;
            public byte canUnDo;
        }

        public struct ErrorLog
        {
            public DateTime Date;
            public int UserId;
            public string ErrorCode;
            public string ErrorMessage;
            public string ErrorDetails;
        }
        [Serializable()]
        public struct GenericList
        {
            public int Id { get; set; }
            public string Name { get; set; }

            public string ExtraValue { get; set; }
        }


        public struct MemoSourceList
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int PriceListsTypeId { get; set; }
        }

        public struct GenericCheckList
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public bool Checked { get; set; }
            public int TypeID { get; set; }
        }

        public struct SupplierTypeList
        {
            public int Id { get; set; }
            public string Name { get; set; }

            public int SupplierPaymentTypeId { get; set; }
        }


        public struct WorkFlowDraw
        {
            public string StepName { get; set; }

            public int StepStatus { get; set; }
        }
        public struct DocTypeSetting
        {
            public int DocTypeId { get; set; }
            public string SettingCode { get; set; }
            public string SettingValue { get; set; }
        }

        public struct PeriodAndServerDate
        {
            public int PeriodId { get; set; }
            public string ServerDate { get; set; }
            public string ResultError { get; set; }
        }



        public struct BESystemTask
        {
            public string TransactionType { get; set; }
            public string TaskTitle { get; set; }
            public int TransId { get; set; }
            public string TransCode { get; set; }
            public string TRANS_DATE { get; set; }
            public string TransactionUrl { get; set; }

            public int TransactionCount { get; set; }
        }


        public struct BENotification
        {
            public string NotificationDate { get; set; }
            public string NotificationName { get; set; }
            public int Id { get; set; }

        }


        public struct BESystemModule
        {
            public string ModuleCode { get; set; }
            public string ModuleName { get; set; }
            public string ModuleUrl { get; set; }
            public string ModuleIcon { get; set; }

        }


        public struct BEUserSession
        {
            public LoggedUserInfo UserLoginInfo { get; set; }
            public int CompanyId { get; set; }
            public int LocationId { get; set; }

        }


        public struct BERightFuncs
        {
            public int CanSave { get; set; }
            public int CanPrint { get; set; }
            public int CanDelete { get; set; }
        }





        #endregion

        #region Enum


        public enum ScreenType
        {
            ChartOfAccount = 1,
            SubChartOfAccount = 2
        }



        public enum ProjectControlSetting
        {
            DateResetOnNew = 20070010
        }

        public enum TransIncluded
        {
            TransOpen = 2,
            TransClosed = 3
        }
        public enum Language
        {
            English = 1,
            Arabic = 2
        };

        public enum UserType
        {
            Admin = 1,
            Member = 0
        }
        public enum VoucherType
        {
            ReceiveVoucher = 1,
            PaymentVoucher = 2,
            JournalVoucher = 3
            , ReceiveCheque = 4,
            DepositCheque = 5
            ,
            CollectCheque = 6
        };

        public enum SupplierFilterationMode
        {
            PaymentSupplier = 1,
            DirectSupplier = 2,
            HasPaymentSupplier = 3,
            PaymentAndDirect = 4,
            DirectAndHasPaymentSupplier = 5
        }
        public enum ReportFieldControl
        {
            Text,
            Combo,
            Date
        }

        public enum ReportFieldType
        {
            String,
            Integer,
            Date
        }

        public enum ReportParamType
        {
            SelectionFormula = 1,
            Parameter = 2,
            ReportFormula = 3
        }

        public enum AccountStatus
        {
            NotActive = 0,
            Active = 1,
            Holded = 2

        }
        public enum ModuleNames
        {
            Index
            
          

        }
        public enum GridIds
        {
            ItemUnitsOfMeasure_List,
            ItemPrices_List,
            ItemLocations_List,
            Locations_POS,
            Locations_SubLocations,
            ItemsSearch_SearchResults,
            PriceListSearch_SearchResults,
            PriceLists_PriceListItems,
            MemoItems_List,
            MemoNewItems_List,
            DeditSettelment,
            Check,
            POItems_List,
            PONewItems_List,
            GRNItems_List,
            IssueDetails_List,
            TransferDetails_List,
            SupplierTransPayments,
            CreditSettelment,
            RETItems_List,
            ReceiveItemsDetails_List,
            StkAdjItems_List,
            ItemSupplier_List,
            ItemLedger_List,
            stocktakingItems_List,
            ItemStock_List,
            SearchTransactions_List,
            StockTransactions_List,
            AccountantTransactions_List,
            CheckBonds_List,
            SupplierPOs_List,
            LotManager_List,
            ReqItems_List,
            ImportPoDetails_List,
            TransactionSearch_groups,
            TransactionSearch_Details,
            ItemUnitBarcode_List,
            TaskGrid_List,
            SpecialItems_List,
            SelectedItems_List,
            INVENTORY_List,
            RelatedItem_List,
            SupplierItems_List,
            SupplierItemsTemp_List,
            IssueDamageDetails_List,
            ScheduleAmountsDetails_List,
            LocationStock_List
        }

        public enum ControlPanelTree
        {
            ItemMaster = 200200,
            PO = 200300,
            Req = 200400,
            GRN = 200500,
            SuppReturn = 200600
        }

        public enum RequestResult
        {
            Success,
            Empty,
            Error,
            Add,
            Edit,
            SqlError,
            Print
        }

        public enum DocumentTypeSetting
        {
            TRANFER_TYPE
        }

        public enum VouchersDateTypes
        {
            Journal = 20001003,
            PaymentVoucherMulti = 20001002,
            ReceiptVoucherMulti = 20001001
        }

        public enum PeriodType
        {
            Open = 1,
            Normal = 2,
            Close = 3
        }
        public enum AccountingSubModule
        {
            Receivable = 0,
            Payable = 1
        }

        public enum VoucherPayableReceivable
        {
            Receivable = 1,
            Payable = 2
        }

        public enum SystemSettingNames
        {
            ALLOW_SUBLOCATIONS,
            GENERATE_ITEM_CODE,
            IS_CHECK_MANUAL
        }

        public enum SearchMode
        {
            AutoComplete = 1,
            Enter = 2,
            PopUp = 3
        }


        public enum ZeroControllCase
        {
            Allow = 1,
            Confirm = 3,
            Block = 2
        }

        public enum LocationType
        {
            Store = 101,
            Market = 102
        }

        public enum ReceiveType
        {
            Direct = 1,
            Indirect = 2
        }

       

        public struct BEExceptionResult
        {
            public string BussinessExceptionMessage { get; set; }
            public string ErrorMessage { get; set; }
        }
        #endregion
    }
}
