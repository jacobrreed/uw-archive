/**
 * 
 */
package tests;

import static org.junit.Assert.*;

import java.math.BigDecimal;
import model.Item;
import model.ItemOrder;
import org.junit.Before;
import org.junit.Test;


/**
 * Description.
 * @author Jacob Reed
 * @version Apr 10, 2017
 *
 */
public class ItemOrderTest {
    /** Item for testing. */
    private Item myItem;
    /** int for quantity. */
    private int myQuantity;
    /** ItemOrder for testing. */
    private ItemOrder myOrder;
    /**
     * @throws java.lang.Exception Exception.
     */
    @Before
    public void setUp() throws Exception {
        myItem = new Item("Apple", new BigDecimal("0.99"));
        myQuantity = 5;
        myOrder = new ItemOrder(myItem, myQuantity);
    }

    /**
     * Test method for {@link model.ItemOrder#ItemOrder(model.Item, int)}.
     */
    @Test (expected = NullPointerException.class)
    public void testItemOrderNullItem() {
        myOrder = new ItemOrder(null, myQuantity);
    }
    
    /**
     * Test method for {@link model.ItemOrder#ItemOrder(model.Item, int)}.
     */
    @Test (expected = IllegalArgumentException.class)
    public void testItemQuantIllegal() {
        myOrder = new ItemOrder(myItem, -1);
    }
    
    /**
     * Test method for {@link model.ItemOrder#getItem()}.
     */
    @Test
    public void testGetItem() {
        assertEquals(myItem, myOrder.getItem());
    }

    /**
     * Test method for {@link model.ItemOrder#getQuantity()}.
     */
    @Test
    public void testGetQuantity() {
        assertEquals(5, myOrder.getQuantity());
    }

    /**
     * Test method for {@link model.ItemOrder#toString()}.
     */
    @Test
    public void testToString() {
        assertEquals("Apple x 5", myOrder.toString());
    }

}
