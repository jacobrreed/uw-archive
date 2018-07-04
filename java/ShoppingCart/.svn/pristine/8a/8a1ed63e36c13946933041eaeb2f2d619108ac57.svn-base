/*
 * TCSS 305 - Spring 2017
 * Assignment 2 - Shopping Cart
 */
package model;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * 
 * Shopping Cart.
 * @author Jacob Reed
 * @version Apr 7, 2017
 *
 */
public class ShoppingCart {
    
    /** Map to hold ItemOrder. */
    private Map<Item, Integer> myCart;
    /** Boolean for membership status. */
    private boolean myMembership;

    
    /**
     * Constructor that creates an empty shopping cart.
     */
    public ShoppingCart() {
        myCart = new HashMap<Item, Integer>();
        myMembership = false;
    }

    /**
     * Adds an order to the shopping cart, replacing any previous,
     * order for an equivalent item with the new order.
     * @param theOrder ItemOrder
     */
    public void add(final ItemOrder theOrder) {
        Objects.requireNonNull(theOrder);
        if (myCart.containsKey(theOrder.getItem())) { //if item is present
            myCart.remove(theOrder.getItem());
            myCart.put(theOrder.getItem(), theOrder.getQuantity()); 
        } else {
            myCart.put(theOrder.getItem(), theOrder.getQuantity());
        }
    }
    


    /**
     * Sets whether or not customer for this shopping cart has a store membership.
     * @param theMembership True if member, false otherwise.
     */
    public void setMembership(final boolean theMembership) {
        myMembership = theMembership;
    }

    /**
     * Generates total cost of this shopping cart.
     * @return Returns total cost using a scale of 2 (ROUND_HALF_EVEN)
     */
    public BigDecimal calculateTotal() {
        BigDecimal tempTotalResult = new BigDecimal(0);
        for (final Item x : myCart.keySet()) { 
            final BigDecimal tempBQ = new BigDecimal(x.getBulkQuantity());
            final BigDecimal tempBP = x.getBulkPrice();
            BigDecimal tempPrice = x.getPrice();
            BigDecimal tempQuant = new BigDecimal(myCart.get(x));
            if (myMembership) { //if member
                /*
                 * While quantity is >= Bulk quantity
                 * add the value of bulk price
                 * then subtract that bulk quantity from quantity left
                 * If quantity left is < bulk quantity required 
                 * exit loop
                 */
                while (tempQuant.intValue() >= tempBQ.intValue()) {
                    tempTotalResult = tempTotalResult.add(tempBP);
                    tempQuant = tempQuant.subtract(tempBQ);
                }
                //add remainder * regular price
                final BigDecimal tempRemainder = tempQuant.multiply(tempPrice);
                tempTotalResult = tempTotalResult.add(tempRemainder);
            } else {
                //If no bulk pricing
                tempPrice = tempQuant.multiply(tempPrice);
                tempTotalResult = tempTotalResult.add(tempPrice);
                
            }
        }
        tempTotalResult = tempTotalResult.setScale(2, BigDecimal.ROUND_HALF_EVEN);
        return tempTotalResult; 
    }
    
    /**
     * Removes all orders from cart.
     */
    public void clear() {
        myCart.clear();
    }

    @Override
    /**
     * Returns a String representation of this ShoppingCart.
     * @return String for shopping cart
     */
    public String toString() {
        String result = "";
        for (Item x : myCart.keySet()) {
            result += x.toString();
            result += " x ";
            result += myCart.get(x);
            result += "\n";
        }
        return result;
    }

}
