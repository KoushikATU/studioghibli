package ghiblisMovie;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
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

public class LoginTest {

	private ChromeOptions options = new ChromeOptions();
    private WebDriver driver;
    private String driverpath,CSVPath;
    private Random random = new Random();

    @BeforeMethod
    public void setUp() {
    	try {

        	// Get the ChromeDriver executable path from the environment variable
        	// driverpath = System.getenv("PATH");
        	WebDriverManager.chromedriver().setup();
//        	options.setHeadless(true);
//        	options.addArguments("--no-sandbox");
        	options.addArguments("--remote-allow-origins=*");
        	options.addArguments("--disable-dev-shm-usage");
            // Set up the web driver    	
//        	driverpath = System.getProperty("user.dir")+"\\src\\main\\resources\\chromedriver.exe";
//            System.setProperty("webdriver.chrome.driver", driverpath);
            driver = new ChromeDriver(options);
            driver.manage().timeouts().implicitlyWait(20,TimeUnit.SECONDS);  

            driver.manage().window().maximize(); 
            // Navigate to the login page
            driver.get("http://localhost:3000/login");
    	}
    	catch (Exception e) {
    	    System.out.println("Exception occurred: " + e.getMessage());
    	}
    }

    @Test(dataProvider = "loginData")
    public void testRegistration(String username, String password, String extraRequest) throws InterruptedException {
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
        // check if the word you're looking for is present in the source code
        Assert.assertTrue(sourceCode.contains("You have been loggined in!!!! Choose the course !!!"), "The word 'You have been loggined in!!!! Choose the course !!!' is not present in the page source.");

    }

    @AfterMethod
    public void tearDown() {
        // Close the browser
        driver.quit();
    }

    @DataProvider(name = "loginData")
    public Object[][] loginData() throws IOException, CsvException {
        // Read the data from the CSV file
    	CSVPath = System.getProperty("user.dir")+"\\src\\main\\resources\\Login_TestData.csv";
        CSVReader reader = new CSVReader(new FileReader(CSVPath));
        List<String[]> data = reader.readAll();

        // Convert the data to a 2D Object array
        Object[][] loginData = new Object[data.size()-1][3];
        for (int i = 1, j=0; i < data.size(); i++,j++) {
        	loginData[j][0] = data.get(i)[0];
        	loginData[j][1] = data.get(i)[1];
        	loginData[j][2] = data.get(i)[2];
        }
        return loginData;
    }
}
