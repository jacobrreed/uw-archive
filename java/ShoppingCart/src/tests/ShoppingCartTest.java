/**
 * 
 */
package tests;

import static org.junit.Assert.*;

import java.math.BigDecimal;
import model.Item;
import model.ItemOrder;
import model.ShoppingCart;
import org.junit.Before;
import org.junit.Test;
/**
 * Description.
 * @author Jacob Reed
 * @version Apr 10, 2017
 *
 */
public class ShoppingCartTest {
    
    /** BigDec to hold total cost. */
    private BigDecimal myTotal;
    /** Shopping cart. */
    private ShoppingCart myShoppingCart;
    /** test item. */
    private Item myItem;
    /** test item order. */
    private ItemOrder myItemOrder;
    
    /**
     * @throws java.lang.Exception Exception.
     */
    @Before
    public void setUp() throws Exception {
        myShoppingCart = new ShoppingCart();
        myTotal = new BigDecimal(0);
        myItem = new Item("Apple", new BigDecimal("0.99"), 5,
                          new BigDecimal("0.75"));
        myItemOrder = new ItemOrder(myItem, 6);
        
    }

    /**
     * Test method for {@link model.ShoppingCart#add(model.ItemOrder)}.
     */
    @Test (expected = NullPointerException.class)
    public void testAddNull() {
        myShoppingCart.add(null);
    }
    
    /**
     * Test method for {@link model.ShoppingCart#add(model.ItemOrder)}.
     */
    @Test
    public void testAddDupe() {
        myShoppingCart.add(myItemOrder);
    }
    
    /**
     * Test method for {@link model.ShoppingCart#setMembership(boolean)}.
     */
    @Test
    public void testSetMembership() {
        myShoppingCart.setMembership(false);
    }

    /**
     * Test method for {@link model.ShoppingCart#calculateTotal()}.
     */
    @Test
    public void testCalculateTotalBulk() {
        assertEquals(new BigDecimal("1.74"), myShoppingCart.calculateTotal());
    }

    /**
     * Test method for {@link model.ShoppingCart#clear()}.
     */
    @Test
    public void testClear() {
        fail("Not yet implemented");
    }

    /**
     * Test method for {@link model.ShoppingCart#toString()}.
     */
    @Test
    public void testToString() {
        fail("Not yet implemented");
    }

}
