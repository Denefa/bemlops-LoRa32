function decodeUplink(input) {
  
    var temp1 = input.bytes[0] << 8 | input.bytes[1];
    var temp2 = input.bytes[2] << 8 | input.bytes[3];
    var temp3 = input.bytes[4] << 8 | input.bytes[5];
    var temp4 = input.bytes[6] << 8 | input.bytes[7];
    var temp5 = input.bytes[8] << 8 | input.bytes[9];
    var temp6 = input.bytes[10] << 8 | input.bytes[11];
    var hum = input.bytes[12] << 8 | input.bytes[13];
    var sca = input.bytes[14] << 8 | input.bytes[15];
    var decoded_var = String.fromCharCode(input.bytes[16], input.bytes[17], input.bytes[18],input.bytes[19]);
  
    return {
      data: {
        field1: decoded_var,
        field2: temp1/100,
        field3: temp2/100,
        field4: temp3/100,
        field5: temp4/100,
        field6: temp5/100,
        field7: hum/10,
        field8: sca/10,
        
      }
    };
}