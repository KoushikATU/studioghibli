package ghiblisMovie;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import org.testng.Assert;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

public class AdminTest {

	private ChromeOptions options = new ChromeOptions();
    private WebDriver driver;
    private String driverpath,CSVPath;
    private Random random = new Random();

    @BeforeMethod
    public void setUp() {
    	try {
        	WebDriverManager.chromedriver().setup();
//        	options.setHeadless(true);
//        	options.addArguments("--no-sandbox");
        	options.addArguments("--remote-allow-origins=*");
        	options.addArguments("--disable-dev-shm-usage");
            // Set up the web driver    	
			//driverpath = System.getProperty("user.dir")+"\\src\\main\\resources\\chromedriver.exe";
        	//System.setProperty("webdriver.chrome.driver", driverpath);
            driver = new ChromeDriver(options);
            driver.manage().timeouts().implicitlyWait(20,TimeUnit.SECONDS);  

            driver.manage().window().maximize(); 
            // Navigate to the Admin page
            driver.get("http://localhost:3000/Admin");
    	}
    	catch (Exception e) {
    	    System.out.println("Exception occurred: " + e.getMessage());
    	}
    }

    @Test(dataProvider = "adminData")
    public void testRegistration(String username, String password) throws InterruptedException {
        // Enter the form data
    	driver.findElement(By.cssSelector("input:nth-child(2)")).sendKeys(username);
        // delay added after entering username
        Thread.sleep(random.nextInt(1000) + 500);
    	driver.findElement(By.cssSelector("input:nth-child(4)")).sendKeys(password);
        // delay added after entering password
        Thread.sleep(random.nextInt(1000) + 500);

        // Submit the form
        driver.findElement(By.cssSelector("input:nth-child(6)")).click();
        // delay added after entering email
        Thread.sleep(random.nextInt(10000) + 500);
        
        // get the entire HTML source code of the current page
        String sourceCode = driver.getPageSource();
        
        if (sourceCode.contains("Table of Data:")) {
        	// Find the table element
            WebElement table = driver.findElement(By.tagName("table"));

            // Find all the rows in the table
            List<WebElement> rows = table.findElements(By.tagName("tr"));

            // Iterate through each row
            for (int i = 1; i < rows.size(); i++) { // Start at index 1 to skip header row
                WebElement row = rows.get(i);
                
                // Find the first column in the row
                WebElement firstColumn = row.findElement(By.tagName("td"));//[1]

                // Check if the text in the first column is "Test1"
                if (firstColumn.getText().equals("Test1")) {
                	// Get the list of columns
                	List<WebElement> columns = row.findElements(By.tagName("td"));
                    // Find the last column in the row
                	WebElement lastColumn = columns.get(columns.size()-1);
                    //WebElement lastColumn = row.findElement(By.tagName("td[last()]"));

                    // Check if the last column contains a button
                    WebElement button = null;
                    try {
                        button = lastColumn.findElement(By.tagName("button"));
                    } catch (org.openqa.selenium.NoSuchElementException e) {
                        // No button found in last column, do nothing
                    }

                    // Click the button if it exists
                    if (button != null) {
                        button.click();
                        driver.navigate().refresh();
                        Thread.sleep(random.nextInt(2000) + 2000);
                        table = driver.findElement(By.tagName("table"));
                        rows = table.findElements(By.tagName("tr"));
                        boolean check1= false,check2 = false;
                        // Iterate through each row
                        for (int j = 1; j < rows.size(); j++) { // Start at index 1 to skip header row
                            row = rows.get(j);
                            // Get all the cells in the row
                            List<WebElement> cells = row.findElements(By.tagName("td"));
                            // Checking the test id present in the columns and storeed as boolean
                            check1 = !cells.get(0).getText().contains("Test1");
                            check2 = !cells.get(2).getText().contains("Test1@abc.com");                        
                        }
                        if(check1 && check2)
                        {
                        	System.out.println("The admin operations were successful");
                        	// Assert that both conditions are true, indicating that the test has passed
                        	Assert.assertTrue(check1 && check2, "The admin operations were successful");
                        }
                        else {
                        	// fail the test
                        	Assert.fail("Failed to perform admin operations");
                        }
                    }
                }
            }
            
        }
        else {
            // fail the test if the word "Table of Data:" is not found
            Assert.fail("Failed to login to the admin page");
        }
        

    }

    @AfterMethod
    public void tearDown() {
        // Close the browser
        driver.quit();
    }

    @DataProvider(name = "adminData")
    public Object[][] adminData() throws IOException, CsvException {
        // Read the data from the CSV file
    	CSVPath = System.getProperty("user.dir")+"\\src\\main\\resources\\Admin_TestData.csv";
        CSVReader reader = new CSVReader(new FileReader(CSVPath));
        List<String[]> data = reader.readAll();

        // Convert the data to a 2D Object array
        Object[][] adminData = new Object[data.size()-1][2];
        for (int i = 1, j=0; i < data.size(); i++,j++) {
        	adminData[j][0] = data.get(i)[0];
        	adminData[j][1] = data.get(i)[1];
        }
        return adminData;
    }
}
