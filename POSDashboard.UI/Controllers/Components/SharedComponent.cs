using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

namespace POSDashboard.UI.Controllers.Components
{
    public class SharedComponent
    {
        public static string GetAppPath()
        {
            string appPath = HttpContext.Current.Request.ApplicationPath;

            if (appPath == "/")
            {
                return string.Empty;
            }
            else
                return appPath + "/";
        }

      

        public static string SerializeDataTable(DataTable dt, string tableName)
        {
            try
            {
                Dictionary<string, object> resultMain = new Dictionary<string, object>();
                int index = 0;

                foreach (DataRow row in dt.Rows)
                {
                    Dictionary<string, object> result = new Dictionary<string, object>();

                    foreach (DataColumn column in dt.Columns)
                    {
                        if (column.DataType == typeof(DateTime) && row[column] != DBNull.Value)
                            result.Add(column.ColumnName, ((DateTime)row[column]).ToString("dd/MM/yyyy"));
                        else
                            result.Add(column.ColumnName, row[column].ToString());
                    }

                    resultMain.Add(tableName + index.ToString(), result);
                    index++;
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(resultMain);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void UploadFile(HttpPostedFileBase file, string fileContainer, ref string savePath, bool isPhysicalPath = false, string renameFile = "")
        {
            string fileName = string.Empty;
            string appPath = GetAppPath();

            if (file != null)
            {
                if (!isPhysicalPath)
                {
                    // check if path exist
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(appPath + fileContainer)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(appPath + fileContainer));
                    }

                    // save image
                    fileName = Path.GetFileNameWithoutExtension(file.FileName) + renameFile + Path.GetExtension(file.FileName);
                    savePath = Path.Combine(HttpContext.Current.Server.MapPath(appPath + fileContainer), fileName);

                }
                else
                {
                    // check if path exist
                    if (!Directory.Exists(fileContainer))
                    {
                        Directory.CreateDirectory(fileContainer);
                    }

                    // save 
                    if (string.IsNullOrEmpty(renameFile))
                    {
                        fileName = Path.GetFileName(file.FileName);
                        savePath = Path.Combine(fileContainer, fileName);
                    }
                    else
                    {
                        savePath = Path.Combine(fileContainer, renameFile + Path.GetExtension(file.FileName));
                    }

                }

                file.SaveAs(savePath);
            }
        }

        public static void DownloadFile(string filepath)
        {
            Stream iStream = null;
            // Buffer to read 10K bytes in chunk
            //byte[] buffer = new Byte[10000];
            // Buffer to read 1024K bytes in chunk

            FileInfo objSourceFileInfo = default(System.IO.FileInfo);

            objSourceFileInfo = new FileInfo(filepath);

            byte[] buffer = new Byte[1048576];

            // Length of the file:


            int length;
            // Total bytes to read:


            long dataToRead;

            try
            {
                // Open the file.


                iStream = new FileStream(filepath, FileMode.Open, FileAccess.Read, FileShare.Read);
                // Total bytes to read:


                dataToRead = iStream.Length;
                HttpContext.Current.Response.ContentType = "application/octet-stream";
                HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(objSourceFileInfo.Name.Replace(' ', '_'), System.Text.Encoding.UTF8));
                // Read the bytes.


                while (dataToRead > 0)
                {
                    // Verify that the client is connected.


                    if (HttpContext.Current.Response.IsClientConnected)
                    {
                        // Read the data in buffer.


                        length = iStream.Read(buffer, 0, 10000);

                        // Write the data to the current output stream.


                        HttpContext.Current.Response.OutputStream.Write(buffer, 0, length);

                        // Flush the data to the HTML output.


                        HttpContext.Current.Response.Flush();

                        buffer = new Byte[10000];
                        dataToRead = dataToRead - length;
                    }
                    else
                    {
                        //prevent infinite loop if user disconnects


                        dataToRead = -1;
                    }
                }
            }
            catch (Exception ex)
            {
                // Trap the error, if any.
                //HttpContext.Current.Response.Write("Error : " + ex.Message);


                HttpContext.Current.Response.ContentType = "text/html";
                HttpContext.Current.Response.Write("Error : file not found");

            }
            finally
            {
                if (iStream != null)
                {
                    //Close the file.


                    iStream.Close();
                }
                HttpContext.Current.Response.End();
                HttpContext.Current.Response.Close();

            }

        }

        public static void CopyFile(string srcPath, string destPath)
        {
            // Create directory if not exist
            if (!Directory.Exists(Path.GetDirectoryName(destPath)))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(destPath));
            }

            // Copy file to virtual directory
            File.Copy(Path.Combine(srcPath), Path.Combine(destPath), true);
        }

        #region Query strting encryption

        private string DEFAULT_KEY
        {
            get { return "#kl?+@<z"; }
        }

        private string encryptKey
        {
            get { return "%&gt;s{;+#"; }
        }

        /// <summary>
        /// Encrypts the query strings.
        /// </summary>
        /// <param name="unencryptedStrings">The unencrypted strings.</param>
        /// <returns></returns>
        public string EncryptQueryStrings(string unencryptedStrings)
        {
            try
            {
                return string.Concat("request=", Encrypt(unencryptedStrings, encryptKey));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Decrypt query string.
        /// </summary>
        /// <param name="encryptedStrings">Encrypted query string.</param>
        /// <param name="key">Key, being used to decrypt.</param>
        /// <remarks>The query string object replaces '+' character with an empty character.</remarks>
        /// <returns></returns>
        public string DecryptQueryStringsb(string encryptedStrings)
        {

            string encryptedStr = encryptedStrings.Replace(" ", "+");
            encryptedStr = encryptedStr.Replace("request=", "");
            return Decrypt(encryptedStr, encryptKey);
        }

        /// <summary>
        /// Encrypts the specified string to encrypt.
        /// </summary>
        /// <param name="stringToEncrypt">The string to encrypt.</param>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        private string Encrypt(string stringToEncrypt, string key)
        {
            try
            {
                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                MemoryStream memoryStream = new MemoryStream();
                CryptoStream cryptoStream;

                // Check whether the key is valid, otherwise make it valid
                CheckKey(ref key);

                des.Key = HashKey(key, des.KeySize / 8);
                des.IV = HashKey(key, des.KeySize / 8);
                byte[] inputBytes = Encoding.UTF8.GetBytes(stringToEncrypt);

                cryptoStream = new CryptoStream(memoryStream, des.CreateEncryptor(), CryptoStreamMode.Write);
                cryptoStream.Write(inputBytes, 0, inputBytes.Length);
                cryptoStream.FlushFinalBlock();

                return Convert.ToBase64String(memoryStream.ToArray());

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Decrypts the specified string to decrypt.
        /// </summary>
        /// <param name="stringToDecrypt">The string to decrypt.</param>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        private string Decrypt(string stringToDecrypt, string key)
        {
            try
            {
                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                MemoryStream memoryStream = new MemoryStream();
                CryptoStream cryptoStream;

                // Check whether the key is valid, otherwise make it valid
                CheckKey(ref key);

                des.Key = HashKey(key, des.KeySize / 8);
                des.IV = HashKey(key, des.KeySize / 8);
                byte[] inputBytes = Convert.FromBase64String(stringToDecrypt);

                cryptoStream = new CryptoStream(memoryStream, des.CreateDecryptor(), CryptoStreamMode.Write);
                cryptoStream.Write(inputBytes, 0, inputBytes.Length);
                cryptoStream.FlushFinalBlock();

                Encoding encoding = Encoding.UTF8;
                return encoding.GetString(memoryStream.ToArray());

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Make sure the used key has a length of exact eight characters.
        /// </summary>
        /// <param name="keyToCheck">Key being checked.</param>
        private void CheckKey(ref string keyToCheck)
        {
            try
            {
                keyToCheck = keyToCheck.Length > 8 ? keyToCheck.Substring(0, 8) : keyToCheck;

                if (keyToCheck.Length < 8)
                {
                    for (int i = keyToCheck.Length; i < 8; i++)
                    {
                        keyToCheck += DEFAULT_KEY[i];
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Hash a key.
        /// </summary>
        /// <param name="key">Key being hashed.</param>
        /// <param name="length">Length of the output.</param>
        /// <returns></returns>
        private byte[] HashKey(string key, int length)
        {
            try
            {

                SHA1CryptoServiceProvider sha1 = new SHA1CryptoServiceProvider();

                // Hash the key
                byte[] keyBytes = Encoding.UTF8.GetBytes(key);
                byte[] hash = sha1.ComputeHash(keyBytes);

                // Truncate hash
                byte[] truncatedHash = new byte[length];
                Array.Copy(hash, 0, truncatedHash, 0, length);

                return truncatedHash;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion


        #region Business exceptions


        /// <summary>
        /// Business exception, that session timeout
        /// </summary>
        public class SessionTimeOut : Exception
        {
            public SessionTimeOut(string message) : base(message) { }
        }

        public class CrystalObjectNotFound : Exception
        {
            public CrystalObjectNotFound(string message) : base(message) { }
        }

        #endregion
    }
}