/**
 * 
 */
package tests;

import static org.junit.Assert.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import model.Item;
import org.junit.Before;
import org.junit.Test;


/**
 * Description.
 * @author Jacob Reed
 * @version Apr 9, 2017
 *
 */
public class ItemTest {
    /** New Item. */
    private Item myItem;
    /** Name of item. */
    private String myName;
    /** Price of item. */
    private BigDecimal myPrice;
    /** Bulk quantity of item. */
    private int myBulkQuantity;
    /** Bulk price of item. */
    private BigDecimal myBulkPrice;
    /** Different Item. */
    private Item myDiffItem;
    /** copy of item. */
    private Item myCopyItem;
    
    /**
     * Setup.
     * @throws java.lang.Exception Exception.
     */
    @Before
    public void setUp() throws Exception {
        myItem = new Item("Apple", 
                          new BigDecimal("0.99").setScale(2,  RoundingMode.HALF_EVEN));
        myCopyItem = new Item("Apple", 
                          new BigDecimal("0.99").setScale(2,  RoundingMode.HALF_EVEN));
        myDiffItem = new Item("Banana", 
                          new BigDecimal("1.50").setScale(2,  RoundingMode.HALF_EVEN), 
                          5, new BigDecimal("1.10").setScale(2,  RoundingMode.HALF_EVEN));
        myName = "";
        myPrice = new BigDecimal(0).setScale(2,  RoundingMode.HALF_EVEN);
        myBulkQuantity = 0;
        myBulkPrice = new BigDecimal(0).setScale(2,  RoundingMode.HALF_EVEN);
    }


    /**
     * Tests 2 argument constructor.
     * Test method for {@link model.Item#Item(java.lang.String, java.math.BigDecimal)}.
     */
    @Test
    public void testItemStringBigDecimal() {
        assertEquals("Apple", myItem.getName());
        assertEquals(new BigDecimal("0.99"), myItem.getPrice());
    }
    
    /**
     * Test method for four item constructor.
     * for {@link model.Item
     * #Item(java.lang.String, java.math.BigDecimal, int, java.math.BigDecimal)}.
     */
    @Test
    public void testItemStringBigDecimalIntBigDecimal() {
        myItem = new Item("Banana", new BigDecimal(0).setScale(2,  RoundingMode.HALF_EVEN),
                          5, new BigDecimal("1.50").setScale(2,  RoundingMode.HALF_EVEN));
    }
    
    /**
     * Test method  to test null name.
     * for {@link model.Item
     * #Item(java.lang.String, java.math.BigDecimal)}.
     */
    @Test (expected = NullPointerException.class)
    public void testItemNullName() {
        myItem = new Item(null, new BigDecimal(0).setScale(2,  RoundingMode.HALF_EVEN));
    }
    
    /**
     * Test method to test blank item name.
     * for {@link model.Item
     * #Item(java.lang.String, java.math.BigDecimal)}.
     */
    @Test (expected = IllegalArgumentException.class)
    public void testItemBlankName() {
        myItem = new Item("", new BigDecimal(0).setScale(2,  RoundingMode.HALF_EVEN));
    }
    
    /**
     * Test method to test illegal base price.
     * for {@link model.Item
     * #Item(java.lang.String, java.math.BigDecimal)}.
     */
    @Test (expected = IllegalArgumentException.class)
    public void testItemNegativeBasePrice() {
        myItem = new Item("Apple", new BigDecimal(-1).setScale(2,  RoundingMode.HALF_EVEN));
    }
    
    /**
     * Test method to test null base price.
     * for {@link model.Item
     * #Item(java.lang.String, java.math.BigDecimal)}.
     */
    @Test (expected = NullPointerException.class)
    public void testItemNullBasePrice() {
        myItem = new Item("Apple", null);
    }
    
    /**
     * Test method  to test null bulk price.
     * for {@link model.Item
     * #Item(java.lang.String, java.math.BigDecimal, int, java.math.BigDecimal)}.
     */
    @Test (expected = NullPointerException.class)
    public void testItemConstructorNullBulkPrice() {
        myItem = new Item("Apple", new BigDecimal(0).setScale(2,  RoundingMode.HALF_EVEN),
                          5, null);
    }
    
    /**
     * Test method for illegal bulk price. 
     * for {@link model.Item
     * #Item(java.lang.String, java.math.BigDecimal, int, java.math.BigDecimal)}.
     */
    @Test (expected = IllegalArgumentException.class)
    public void testItemConstructorNegativeBulkPrice() {
        myItem = new Item("Apple", new BigDecimal(0).setScale(2,  RoundingMode.HALF_EVEN),
                          5, new BigDecimal(-1).setScale(2,  RoundingMode.HALF_EVEN));
    }
    
    /**
     * Test method for illegal bulk price. 
     * for {@link model.Item
     * #Item(java.lang.String, java.math.BigDecimal, int, java.math.BigDecimal)}.
     */
    @Test (expected = IllegalArgumentException.class)
    public void testItemConstructorIllegalBulkQuantity() {
        myItem = new Item("Apple", new BigDecimal(0).setScale(2,  RoundingMode.HALF_EVEN),
                          -1, new BigDecimal(5).setScale(2,  RoundingMode.HALF_EVEN));
    }
    
    /**
     * Test method for {@link model.Item#getPrice()}.
     */
    @Test
    public void testGetPrice() {
        assertEquals(new BigDecimal("0.99"), myItem.getPrice());
    }

    /**
     * Test method for {@link model.Item#getBulkQuantity()}.
     */
    @Test
    public void testGetBulkQuantity() {
        assertEquals(0, myItem.getBulkQuantity());
    }

    /**
     * Test method for {@link model.Item#getBulkPrice()}.
     */
    @Test
    public void testGetBulkPrice() {
        assertEquals(new BigDecimal("1.10"), myDiffItem.getBulkPrice());
    }

    /**
     * Test method for {@link model.Item#isBulk()}.
     */
    @Test
    public void testIsBulk() {
        assertEquals(true, myDiffItem.isBulk());
        assertEquals(false, myItem.isBulk());
    }
 

    /**
     * Test method for {@link model.Item#setName(java.lang.String)}.
     */
    @Test
    public void testSetName() {
        assertEquals("Apple", myItem.getName());
        myItem = new Item("Orange", myPrice);
        assertEquals("Orange", myItem.getName());
    }

    /**
     * Test method for {@link model.Item#setPrice(java.math.BigDecimal)}.
     */
    @Test
    public void testSetPrice() {
        assertEquals(new BigDecimal("0.99"), myItem.getPrice());
        myItem = new 
                  Item("Apple", new BigDecimal("1.50").setScale(2,  RoundingMode.HALF_EVEN));
        assertEquals(new BigDecimal("1.50"), myItem.getPrice());
    }

    /**
     * Test method for {@link model.Item#getName()}.
     */
    @Test
    public void testGetName() {
        assertEquals("Apple", myItem.getName());
        assertEquals("Banana", myDiffItem.getName());
    }

    /**
     * Test method for {@link model.Item#copy()}.
     */
    @Test
    public void testCopy() {
        myCopyItem = myItem.copy();
        assertEquals(false, myCopyItem == myItem);
        assertEquals("Apple", myCopyItem.getName());
    }

    /**
     * Test method for {@link model.Item#toString()}.
     */
    @Test
    public void testToString() {
        final String test = "Apple, 0.99";
        final String testBulk = "Banana, 1.50 (5 for 1.10)";
        assertEquals(test, myItem.toString());
        assertEquals(testBulk, myDiffItem.toString());
    }

    /**
     * Test method for {@link model.Item#equals(java.lang.Object)}.
     */
    @Test
    public void testEqualsObject() {
        assertEquals(false, myItem.equals(null));
        assertEquals(true, myItem.equals(myCopyItem));
        assertEquals(false, myItem.equals(myDiffItem));
        assertEquals(false, myItem.equals(""));
        final Item newCopy = new Item("Apple", new BigDecimal("1.12"));
        assertEquals(false, myItem.equals(newCopy));
        final Item nameCopy = new Item("Papple", new BigDecimal("0.99"));
        assertEquals(false, myItem.equals(nameCopy));
        final Item bulkPriceCopy = new Item("Apple", new BigDecimal("0.99"), 0, 
                                new BigDecimal("1.11"));
        assertEquals(false, myItem.equals(bulkPriceCopy));
        final Item bulkQuantityCopy = new Item("Apple", new BigDecimal("0.99"), 3, 
                                new BigDecimal(0));
        assertEquals(false, myItem.equals(bulkQuantityCopy));
                        
    }
    
    /**
     * Test method for {@link model.Item#hashCode}.
     */
    @Test
    public void testHashCode() {
        assertEquals(myItem.hashCode(), myCopyItem.hashCode());
    }
}
