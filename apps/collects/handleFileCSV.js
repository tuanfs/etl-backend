import fs from 'fs';
import csv from 'csv-parser';
import {createObjectCsvWriter} from 'csv-writer';
import dayjs from 'dayjs';
import pkgp from 'papaparse';
import pkg from 'exceljs';
const {parse} = pkgp;
const {Workbook} = pkg;

const inputFile = './Hopdongsanpham.csv';

const outputFile = './Hopdongsanpham_output.xlsx';

export function handleFileCSV() {
  let data = [];

  fs.readFile(inputFile, 'utf16le', (err, fileData) => {
    if (err) {
      console.error('Lỗi khi đọc file:', err);
      return;
    }

    parse(fileData, {
      header: true,
      complete: (parsedData) => {
        data = parsedData.data;
        console.log('data', data);
        const processedData = processData(data);

        writeExcel(outputFile, processedData);
      },
      error: (error) => {
        console.error('Lỗi khi parse CSV:', error);
      },
    });
  });

  const processData = (data) => {
    return data.map((row) => ({
      ...row,
      'Trạng thái': handleDateTime(row),
    }));
  };

  const writeExcel = async (outputFile, data) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.columns = [
      {header: 'ID', key: 'id'},
      {
        header: 'Tên sản phẩm',
        key: 'Tên sản phẩm',
      },
      {
        header: 'FRU',
        key: 'FRU',
      },
      {
        header: 'Số PO',
        key: 'Số PO',
      },
      {
        header: 'BP_Account',
        key: 'BP_Account',
      },
      {
        header: 'Hãng',
        key: 'Hãng',
      },
      {
        header: 'Nhà cung cấp',
        key: 'Nhà cung cấp',
      },
      {
        header: 'Địa chỉ nhà cung cấp',
        key: 'Địa chỉ nhà cung cấp',
      },
      {
        header: 'Serial_num',
        key: 'Serial_num',
      },
      {
        header: 'Serial_Mainboard',
        key: 'Serial_Mainboard',
      },
      {
        header: 'Serial_HDD',
        key: 'Serial_HDD',
      },
      {
        header: 'Serial_PowerSupply',
        key: 'Serial_PowerSupply',
      },
      {
        header: 'Serial_HDD',
        key: 'Serial_HDD',
      },
      {
        header: 'Serial_Other',
        key: 'Serial_Other',
      },
      {
        header: 'provider_contact',
        key: 'provider_contact',
      },
      {
        header: 'Bắt đầu bảo hành FIS',
        key: 'Bắt đầu bảo hành FIS',
      },
      {
        header: 'Kết thúc bảo hành FIS',
        key: 'Kết thúc bảo hành FIS',
      },
      {
        header: 'Thời gian bảo hành FIS',
        key: 'Thời gian bảo hành FIS',
      },
      {
        header: 'Trạng thái',
        key: 'Trạng thái',
      },
      {
        header: 'Bắt đầu bảo hành hãng',
        key: 'Bắt đầu bảo hành hãng',
      },
      {
        header: 'Kết thúc bảo hành hãng',
        key: 'Kết thúc bảo hành hãng',
      },
      {
        header: 'Thời gian bảo hành hãng',
        key: 'Thời gian bảo hành hãng',
      },
      {
        header: 'Có xuất kho hay không',
        key: 'Có xuất kho hay không',
      },
      {
        header: 'Ngày hàng về kho',
        key: 'Ngày hàng về kho',
      },
      {
        header: 'Tên hợp đồng bán',
        key: 'Tên hợp đồng bán',
      },
      {
        header: 'AM',
        key: 'AM',
      },
      {
        header: 'Số hóa đơn',
        key: 'Số hóa đơn',
      },
      {
        header: 'Sub phòng ban',
        key: 'Sub phòng ban',
      },
      {
        header: 'Tên khách hàng',
        key: 'Tên khách hàng',
      },
      {
        header: 'Ngày xuất kho',
        key: 'Ngày xuất kho',
      },
      {
        header: 'Mã số phiếu bảo hành',
        key: 'Mã số phiếu bảo hành',
      },
    ];

    worksheet.addRows(data);

    await workbook.xlsx.writeFile(outputFile);
    console.log(`Đã xuất dữ liệu vào ${outputFile}`);
  };
}

function handleDateTime(item) {
  const endDate = dayjs(item['Kết thúc bảo hành FIS'], 'M/D/YYYY');
  const today = dayjs();
  const sixMonthsLater = today.add(6, 'month');

  let status = '';
  if (endDate < today) {
    status = 'Hết hạn';
  } else if (endDate <= sixMonthsLater) {
    status = 'Sắp hết hạn';
  } else {
    status = 'Còn hạn';
  }
  return status;
}
