import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { formatShortTimestamp } from '@/util/time';

function createWorkBook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'wusn';
  workbook.lastModifiedBy = 'wusn';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();
  return workbook;
}

function getFileName(fileName) {
  if (fileName) {
    return fileName;
  }
  return `${formatShortTimestamp(Date.now())}.xlsx`;
}

export function download({
  arrays, title, data, fileName, sheetName = 'Sheet1',
}) {
  return new Promise(
    (resolve, reject) => {
      try {
        const workbook = createWorkBook();
        const workSheet = workbook.addWorksheet(sheetName);
        if (arrays) {
          workSheet.addRows(arrays);
        } else if (!!title && !!data) {
          workSheet.addRows(arrays);
        }
        const saveFileName = getFileName(fileName);
        workbook.xlsx.writeBuffer().then((buffer) => {
          FileSaver.saveAs(new Blob([buffer]), saveFileName);
          resolve();
        }).catch(reject);
      } catch (e) {
        reject(e);
      }
    },
  );
}

const execlUtil = {
  download,
};

export default execlUtil;
