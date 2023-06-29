package com.tmt.TaskManagementTool.util;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.tmt.TaskManagementTool.models.Task;
import com.tmt.TaskManagementTool.repositories.TaskRepository;
import com.tmt.TaskManagementTool.services.TaskService;

@Component("pdfGenerator")
public class GeneratePdfReportUtil {

	@Value("${pdfDir}")
	private String pdfDir;
	
	@Value("${reportFileName}")
	private String reportFileName;
	
	@Value("${reportFileNameDateFormat}")
	private String reportFileNameDateFormat;
	
	@Value("${localDateFormat}")
	private String localDateFormat;
	
	@Value("${table_noOfColumns}")
	private int noOfColumns;
	
	@Value("${table.columnNames}")
	private List<String> columnNames;
	
	@Autowired
	private TaskService taskService;
	
	

	private static Font COURIER = new Font(Font.FontFamily.COURIER, 20, Font.BOLD);
	private static Font COURIER_SMALL = new Font(Font.FontFamily.COURIER, 16, Font.BOLD);
	private static Font COURIER_SMALL_FOOTER = new Font(Font.FontFamily.COURIER, 12, Font.BOLD);

	public void generatePdfReport() {

		Document document = new Document();

		try {
			PdfWriter.getInstance(document, new FileOutputStream(getPdfNameWithDate()));
			document.open();
			addDocTitle(document);
			createTable(document,noOfColumns);
			addFooter(document);
			document.close();
			System.out.println("------------------Your PDF Report is ready!-------------------------");

		} catch (FileNotFoundException | DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/*private void addLogo(Document document) {
		try {	
			Image img = Image.getInstance(logoImgPath);
			img.scalePercent(logoImgScale[0], logoImgScale[1]);
			img.setAlignment(Element.ALIGN_RIGHT);
			document.add(img);
		} catch (DocumentException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/

	private void addDocTitle(Document document) throws DocumentException {
		String localDateString = LocalDateTime.now().format(DateTimeFormatter.ofPattern(localDateFormat));
		Paragraph p1 = new Paragraph();
		leaveEmptyLine(p1, 1);
		p1.add(new Paragraph(reportFileName, COURIER));
		p1.setAlignment(Element.ALIGN_CENTER);
		leaveEmptyLine(p1, 1);
		p1.add(new Paragraph("Report generated on " + localDateString, COURIER_SMALL));

		document.add(p1);

	}

	private void createTable(Document document, int noOfColumns) throws DocumentException {
		Paragraph paragraph = new Paragraph();
		leaveEmptyLine(paragraph, 3);
		document.add(paragraph);

		PdfPTable table = new PdfPTable(noOfColumns);
		
		for(int i=0; i<noOfColumns; i++) {
			PdfPCell cell = new PdfPCell(new Phrase(columnNames.get(i)));
			cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell.setBackgroundColor(BaseColor.CYAN);
			table.addCell(cell);
		}

		table.setHeaderRows(1);
		getDbData(table);
		document.add(table);
	}
	
	private void getDbData(PdfPTable table) {
		
		List<Task> list = taskService.getAllTasks();
		for (Task task : list) {
			
			table.setWidthPercentage(100);
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
			table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
			
			table.addCell(task.getTid());
			table.addCell(task.getTitle());
			table.addCell(task.getCreatedAt());
			table.addCell(task.getCreatedBy());
			table.addCell(task.getAssignedTo());
			table.addCell(task.getDueDate().toString());
			table.addCell(task.getStatus());
			table.addCell(task.getPriority());
			
		}
		
	}
	
	private void addFooter(Document document) throws DocumentException {
		Paragraph p2 = new Paragraph();
		leaveEmptyLine(p2, 3);
		p2.setAlignment(Element.ALIGN_MIDDLE);
		p2.add(new Paragraph(
				"------------------------End Of " +reportFileName+"------------------------", 
				COURIER_SMALL_FOOTER));
		
		document.add(p2);
	}

	private static void leaveEmptyLine(Paragraph paragraph, int number) {
		for (int i = 0; i < number; i++) {
			paragraph.add(new Paragraph(" "));
		}
	}
	
	private String getPdfNameWithDate() {
		String localDateString = LocalDateTime.now().format(DateTimeFormatter.ofPattern(reportFileNameDateFormat));
		return pdfDir+reportFileName+"-"+localDateString+".pdf";
	}
}

