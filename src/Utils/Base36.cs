using System;
using Utils.Numerics;

namespace Utils
{
    /// <summary>
    /// Class representing a Base36 number
    /// </summary>
    public struct Base36
    {
        #region Constants (and pseudo-constants)

        /// <summary>
        /// Base36 containing the maximum supported value for this type
        /// </summary>
        public static readonly Base36 MaxValue = new Base36(long.MaxValue);
        /// <summary>
        /// Base36 containing the minimum supported value for this type
        /// </summary>
        public static readonly Base36 MinValue = new Base36(long.MinValue + 1);

        #endregion

        #region Fields

        private long numericValue;

        #endregion

        #region Constructor

        /// <summary>
        /// Instantiate a Base36 number from a long value
        /// </summary>
        /// <param name="numericValue">The long value to give to the Base36 number</param>
        public Base36(long numericValue)
        {
            this.numericValue = 0; //required by the struct.
            this.NumericValue = numericValue;
        }


        /// <summary>
        /// Instantiate a Base36 number from a Base36 string
        /// </summary>
        /// <param name="value">The value to give to the Base36 number</param>
        public Base36(string value)
        {
            numericValue = 0; //required by the struct.
            this.Value = value;
        }


        #endregion

        #region Properties

        /// <summary>
        /// Get or set the value of the type using a base-10 long integer
        /// </summary>
        public long NumericValue
        {
            get => numericValue;
            set
            {
                //Make sure value is between allowed ranges
                if (value <= long.MinValue)
                {
                    throw new InvalidBase36ValueException(value);
                }

                numericValue = value;
            }
        }


        /// <summary>
        /// Get or set the value of the type using a Base36 string
        /// </summary>
        public string Value
        {
            get => NumberToBase36(numericValue);
            set
            {
                try
                {
                    numericValue = Base36ToNumber(value);
                }
                catch
                {
                    //Catch potential errors
                    throw new InvalidBase36NumberException(value);
                }
            }
        }


        #endregion

        #region Public Static Methods

        /// <summary>
        /// Static method to convert a Base36 string to a long integer (base-10)
        /// </summary>
        /// <param name="base36Value">The number to convert from</param>
        /// <returns>The long integer</returns>
        public static long Base36ToNumber(string base36Value)
        {
            //Make sure we have passed something
            if (base36Value == "")
            {
                throw new InvalidBase36NumberException(base36Value);
            }

            //Make sure the number is in upper case:
            base36Value = base36Value.ToUpper();

            //Account for negative values:
            var isNegative = false;

            if (base36Value[0] == '-')
            {
                base36Value = base36Value.Substring(1);
                isNegative = true;
            }

            //Loop through our string and calculate its value
            try
            {
                //Keep a running total of the value
                long returnValue = Base36DigitToNumber(base36Value[base36Value.Length - 1]);

                //Loop through the character in the string (right to left) and add
                //up increasing powers as we go.
                for (var i = 1; i < base36Value.Length; i++)
                {
                    returnValue += ((long)Math.Pow(36, i) * Base36DigitToNumber(base36Value[base36Value.Length - (i + 1)]));
                }

                //Do negative correction if required:
                if (isNegative)
                {
                    return returnValue * -1;
                }
                else
                {
                    return returnValue;
                }
            }
            catch
            {
                //If something goes wrong, this is not a valid number
                throw new InvalidBase36NumberException(base36Value);
            }
        }


        /// <summary>
        /// Public static method to convert a long integer (base-10) to a Base36 number
        /// </summary>
        /// <param name="numericValue">The base-10 long integer</param>
        /// <returns>A Base36 representation</returns>
        public static string NumberToBase36(long numericValue)
        {
            try
            {
                //Handle negative values:
                if (numericValue < 0)
                {
                    return string.Concat("-", PositiveNumberToBase36(Math.Abs(numericValue)));
                }
                else
                {
                    return PositiveNumberToBase36(numericValue);
                }
            }
            catch
            {
                throw new InvalidBase36ValueException(numericValue);
            }
        }

        /// <summary>
        /// Public static method to convert a long integer (base-10) to a Base36 number
        /// </summary>
        /// <param name="numericValue">The base-10 long integer</param>
        /// <returns>A Base36 representation</returns>
        public static string NumberToBase36(ulong numericValue)
        {
            return PositiveNumberToBase36(numericValue);
        }

        /// <summary>
        /// Public static method to convert a long integer (base-10) to a Base36 number
        /// </summary>
        /// <param name="numericValue">The base-10 long-long integer</param>
        /// <returns>A Base36 representation</returns>
        public static string NumberToBase36(Int128 numericValue)
        {
            try
            {
                //Handle negative values:
                if (numericValue.IsNegative)
                {
                    return string.Concat("-", PositiveNumberToBase36(Int128.Abs(numericValue)));
                }
                else
                {
                    return PositiveNumberToBase36(numericValue);
                }
            }
            catch
            {
                throw new InvalidBase36ValueException();
            }
        }

        /// <summary>
        /// Public static method to convert a long integer (base-10) to a Base36 number
        /// </summary>
        /// <param name="numericValue">The base-10 long-long integer</param>
        /// <returns>A Base36 representation</returns>
        public static string NumberToBase36(UInt128 numericValue)
        {
            return PositiveNumberToBase36(numericValue);
        }

        #endregion

        #region Private Static Methods

        private static string PositiveNumberToBase36(UInt128 numericValue)
        {
            //This is a clever recursively called function that builds
            //the base-36 string representation of the long base-10 value
            if (numericValue < 36)
            {
                //The get out clause; fires when we reach a number less than 
                //36 - this means we can add the last digit.
                return NumberToBase36Digit((byte)numericValue).ToString();
            }
            else
            {
                //Add digits from left to right in powers of 36 
                //(recursive)
                return string.Concat(PositiveNumberToBase36(numericValue / 36), NumberToBase36Digit((byte)(numericValue % 36)).ToString());
            }
        }
        private static string PositiveNumberToBase36(Int128 numericValue)
        {
            //This is a clever recursively called function that builds
            //the base-36 string representation of the long base-10 value
            if (numericValue < 36)
            {
                //The get out clause; fires when we reach a number less than 
                //36 - this means we can add the last digit.
                return NumberToBase36Digit((byte)numericValue).ToString();
            }
            else
            {
                //Add digits from left to right in powers of 36 
                //(recursive)
                return string.Concat(PositiveNumberToBase36(numericValue / 36), NumberToBase36Digit((byte)(numericValue % 36)).ToString());
            }
        }


        private static string PositiveNumberToBase36(ulong numericValue)
        {
            //This is a clever recursively called function that builds
            //the base-36 string representation of the long base-10 value
            if (numericValue < 36)
            {
                //The get out clause; fires when we reach a number less than 
                //36 - this means we can add the last digit.
                return NumberToBase36Digit((byte)numericValue).ToString();
            }
            else
            {
                //Add digits from left to right in powers of 36 
                //(recursive)
                return string.Concat(PositiveNumberToBase36(numericValue / 36), NumberToBase36Digit((byte)(numericValue % 36)).ToString());
            }
        }

        private static string PositiveNumberToBase36(long numericValue)
        {
            //This is a clever recursively called function that builds
            //the base-36 string representation of the long base-10 value
            if (numericValue < 36)
            {
                //The get out clause; fires when we reach a number less than 
                //36 - this means we can add the last digit.
                return NumberToBase36Digit((byte)numericValue).ToString();
            }
            else
            {
                //Add digits from left to right in powers of 36 
                //(recursive)
                return string.Concat(PositiveNumberToBase36(numericValue / 36), NumberToBase36Digit((byte)(numericValue % 36)).ToString());
            }
        }


        private static byte Base36DigitToNumber(char base36Digit)
        {
            //Converts one base-36 digit to it's base-10 value
            if (!char.IsLetterOrDigit(base36Digit))
            {
                throw new InvalidBase36DigitException(base36Digit);
            }

            if (char.IsDigit(base36Digit))
            {
                //Handles 0 - 9
                return byte.Parse(base36Digit.ToString());
            }
            else
            {
                //Handles A - Z
                return (byte)((int)base36Digit - 55);
            }
        }


        private static char NumberToBase36Digit(byte numericValue)
        {
            //Converts a number to it's base-36 value.
            //Only works for numbers <= 35.
            if (numericValue > 35)
            {
                throw new InvalidBase36DigitValueException(numericValue);
            }

            //Numbers:
            if (numericValue <= 9)
            {
                return numericValue.ToString()[0];
            }
            else
            {
                //Note that A is code 65, and in this
                //scheme, A = 10.
                return (char)(numericValue + 55);
            }
        }


        #endregion

        #region Operator Overloads

        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static bool operator >(Base36 lhs, Base36 rhs)
        {
            return lhs.numericValue > rhs.numericValue;
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static bool operator <(Base36 lhs, Base36 rhs)
        {
            return lhs.numericValue < rhs.numericValue;
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static bool operator >=(Base36 lhs, Base36 rhs)
        {
            return lhs.numericValue >= rhs.numericValue;
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static bool operator <=(Base36 lhs, Base36 rhs)
        {
            return lhs.numericValue <= rhs.numericValue;
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static bool operator ==(Base36 lhs, Base36 rhs)
        {
            return lhs.numericValue == rhs.numericValue;
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static bool operator !=(Base36 lhs, Base36 rhs)
        {
            return !(lhs == rhs);
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static Base36 operator +(Base36 lhs, Base36 rhs)
        {
            return new Base36(lhs.numericValue + rhs.numericValue);
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static Base36 operator -(Base36 lhs, Base36 rhs)
        {
            return new Base36(lhs.numericValue - rhs.numericValue);
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static Base36 operator ++(Base36 value)
        {
            return new Base36(value.numericValue++);
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static Base36 operator --(Base36 value)
        {
            return new Base36(value.numericValue--);
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static Base36 operator *(Base36 lhs, Base36 rhs)
        {
            return new Base36(lhs.numericValue * rhs.numericValue);
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static Base36 operator /(Base36 lhs, Base36 rhs)
        {
            return new Base36(lhs.numericValue / rhs.numericValue);
        }


        /// <summary>
        /// Operator overload
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static Base36 operator %(Base36 lhs, Base36 rhs)
        {
            return new Base36(lhs.numericValue % rhs.numericValue);
        }


        /// <summary>
        /// Converts type Base36 to a base-10 long
        /// </summary>
        /// <param name="Value">The Base36 object</param>
        /// <returns>The base-10 long integer</returns>
        public static implicit operator long(Base36 Value)
        {
            return Value.numericValue;
        }


        /// <summary>
        /// Converts type Base36 to a base-10 integer
        /// </summary>
        /// <param name="value">The Base36 object</param>
        /// <returns>The base-10 integer</returns>
        public static implicit operator int(Base36 value)
        {
            try
            {
                return (int)value.numericValue;
            }
            catch
            {
                throw new OverflowException("Overflow: Value too large to return as an integer");
            }
        }


        /// <summary>
        /// Converts type Base36 to a base-10 short
        /// </summary>
        /// <param name="value">The Base36 object</param>
        /// <returns>The base-10 short</returns>
        public static implicit operator short(Base36 value)
        {
            try
            {
                return (short)value.numericValue;
            }
            catch
            {
                throw new OverflowException("Overflow: Value too large to return as a short");
            }
        }


        /// <summary>
        /// Converts a long (base-10) to a Base36 type
        /// </summary>
        /// <param name="value">The long to convert</param>
        /// <returns>The Base36 object</returns>
        public static implicit operator Base36(long value)
        {
            return new Base36(value);
        }


        /// <summary>
        /// Converts type Base36 to a string; must be explicit, since
        /// Base36 > string is dangerous!
        /// </summary>
        /// <param name="value">The Base36 type</param>
        /// <returns>The string representation</returns>
        public static explicit operator string(Base36 value)
        {
            return value.Value;
        }


        /// <summary>
        /// Converts a string to a Base36
        /// </summary>
        /// <param name="value">The string (must be a Base36 string)</param>
        /// <returns>A Base36 type</returns>
        public static implicit operator Base36(string value)
        {
            return new Base36(value);
        }


        #endregion

        #region Public Override Methods

        /// <summary>
        /// Returns a string representation of the Base36 number
        /// </summary>
        /// <returns>A string representation</returns>
        public override string ToString()
        {
            return Base36.NumberToBase36(numericValue);
        }


        /// <summary>
        /// A unique value representing the value of the number
        /// </summary>
        /// <returns>The unique number</returns>
        public override int GetHashCode()
        {
            return numericValue.GetHashCode();
        }


        /// <summary>
        /// Determines if an object has the same value as the instance
        /// </summary>
        /// <param name="obj">The object to compare</param>
        /// <returns>True if the values are the same</returns>
        public override bool Equals(object obj)
        {
            if (!(obj is Base36))
            {
                return false;
            }
            else
            {
                return this == (Base36)obj;
            }
        }


        #endregion

        #region Public Methods

        /// <summary>
        /// Returns a string representation padding the leading edge with
        /// zeros if necessary to make up the number of characters
        /// </summary>
        /// <param name="MinimumDigits">The minimum number of digits that the string must contain</param>
        /// <returns>The padded string representation</returns>
        public string ToString(int MinimumDigits)
        {
            string base36Value = Base36.NumberToBase36(numericValue);

            if (base36Value.Length >= MinimumDigits)
            {
                return base36Value;
            }
            else
            {
                string padding = new string('0', (MinimumDigits - base36Value.Length));
                return string.Format("{0}{1}", padding, base36Value);
            }
        }


        #endregion

    }

    internal class InvalidBase36DigitValueException : Exception
    {
        public InvalidBase36DigitValueException(in byte numericValue) : this("The numeric byte exceeds the range of valid values for base36 encoding.") { }
        public InvalidBase36DigitValueException(string message) : base(message) { }
        public InvalidBase36DigitValueException(string message, Exception innerException) : base(message, innerException) { }
    }

    internal class InvalidBase36DigitException : Exception
    {
        public InvalidBase36DigitException() : this("The character is not a valid base36 encoded 'digit'.") { }

        public InvalidBase36DigitException(string message) : base(message) { }
        public InvalidBase36DigitException(string message, Exception innerException) : base(message, innerException) { }
        public InvalidBase36DigitException(in char base36Digit)
            : this()
        {
            Digit = base36Digit;
        }
        public Char Digit { get; set; }
    }

    public class InvalidBase36ValueException : Exception
    {
        public InvalidBase36ValueException() : this("Value not in the expected range.") { }
        public InvalidBase36ValueException(string message) : base(message) { }
        public InvalidBase36ValueException(string message, Exception innerException) : base(message, innerException) { }
        public InvalidBase36ValueException(in long value)
            : this()
        {
            Value = value;
        }
        public long Value { get; set; }
    }

    public class InvalidBase36NumberException : Exception
    {
        public InvalidBase36NumberException() { }
        public InvalidBase36NumberException(string value, Exception innerException)
            : base("Not a valid base36 encoded value", innerException)
        {
            EncodedValue = value;
        }
        public InvalidBase36NumberException(string value) : this(value, null) { }

        public string EncodedValue { get; set; }
    }
}
