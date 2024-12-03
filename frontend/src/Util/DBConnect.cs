using System;

namespace Util.DB{
    public class DbString{
    public static string Context(){
        string context = Environment.GetEnvironmentVariable("DBstringConn");

        return context;
    }
}
}