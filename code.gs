function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('ตัวอย่างระบบฟอร์ม') // <-----หัวเรื่องแก้ตรงนี้
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
}

/** @บันทึกข้อมูล*/
var folderID = "xxxxxxxxxxxxxxx"  //<----- **เปลี่ยนจุดที่1 ใส่ไอดีโฟรเดอร์ตรงนี้
function savedata(obj) {

  var data = SpreadsheetApp.getActive().getSheetByName("Student")
  folder = DriveApp.getFolderById(folderID)// ไอดีfolder 1

  //----------------------คำสั่งแนบไฟล์ชุดที่1เปลี่ยนค่าตัวแปร var2ค่ากรณีมีมากกว่า 2ไฟล์ให้copyลงไป------------------------------------------------------------------
  var file = folder.createFile(obj.file).getId()
  var filedata = "https://lh3.googleusercontent.com/d/" + file

  //---------------------------------------------------------------------------------------------
  
  //สร้างลำดับอัตโนมัติ
  const uniqueIds = data.getRange(1,1,data.getLastRow(),1).getValues()
  var maxNum = 0
  uniqueIds.forEach( r => {
    maxNum = r[0] > maxNum ? r[0] : maxNum
  })
  // Logger.log(maxNum)
  var newId = maxNum + 1

  //obj = ค่าพารามิเตอร์เมื่อมีการเพิ่มช่อง input ต้องระบุชื่อหลัง objให้ตรงกันกับ name ด้วย
  data.appendRow([
    newId,
    obj.name,
    obj.mydateth,
    obj.age,
    obj.classroom,
    obj.memo,
    filedata, // ดึงค่าตัวแปรมาใส่
  ])

}



