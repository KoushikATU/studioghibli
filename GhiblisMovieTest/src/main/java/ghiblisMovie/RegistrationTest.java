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

public class RegistrationTest {

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
            driver = new ChromeDriver(options);
            driver.manage().timeouts().implicitlyWait(20,TimeUnit.SECONDS);  

            driver.manage().window().maximize(); 

            // Navigate to the registration page
            driver.get("http://localhost:3000/register");
    	}
    	catch (Exception e) {
    	    System.out.println("Exception occurred: " + e.getMessage());
    	}
    	
    }

    @Test(dataProvider = "registrationData")
    public void testRegistration(String name, String username, String password, String email) throws InterruptedException {
        // Enter the form data
    	driver.findElement(By.cssSelector("input:nth-child(2)")).sendKeys(name);
        // delay added after entering name
        Thread.sleep(random.nextInt(1000) + 500);
    	driver.findElement(By.cssSelector("input:nth-child(4)")).sendKeys(email);
        // delay added after entering email
        Thread.sleep(random.nextInt(1000) + 500);
        driver.findElement(By.cssSelector("input:nth-child(6)")).sendKeys(username);
        // delay added after entering username
        Thread.sleep(random.nextInt(1000) + 500);
        driver.findElement(By.cssSelector("input:nth-child(8)")).sendKeys(password);
        // delay added after entering password
        Thread.sleep(random.nextInt(1000) + 500);

        // Submit the form
        driver.findElement(By.cssSelector("input:nth-child(10)")).click();
        // delay added after registration
        Thread.sleep(random.nextInt(5000) + 500);
        
        // Verify the expected result
        String actualResult = driver.findElement(By.cssSelector(".message")).getText();
        System.out.println("actualResult: "+actualResult);
        Thread.sleep(random.nextInt(1000) + 500);
        //Assert.assertEquals(actualResult, "username already exists in our database, please choose a different username");
        Assert.assertEquals(actualResult, "Registeration Successful");
    }

    @AfterMethod
    public void tearDown() {
        // Close the browser
        driver.quit();
    }

    @DataProvider(name = "registrationData")
    public Object[][] registrationData() throws IOException, CsvException {
        // Read the data from the CSV file
    	CSVPath = System.getProperty("user.dir")+"\\src\\main\\resources\\Registration_TestData.csv";
        CSVReader reader = new CSVReader(new FileReader(CSVPath));
        List<String[]> data = reader.readAll();

        // Convert the data to a 2D Object array
        Object[][] registrationData = new Object[data.size()-1][4];
        for (int i = 1, j=0; i < data.size(); i++,j++) {
            registrationData[j][0] = data.get(i)[0];
            registrationData[j][1] = data.get(i)[1];
            registrationData[j][2] = data.get(i)[2];
            registrationData[j][3] = data.get(i)[3];
        }
        return registrationData;
    }
}
