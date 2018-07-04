/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package tools;

import java.awt.Color;
import java.awt.Shape;

/**
 * 
 * This class holds the shapes from drawing for redo and undo.
 * @author Jacob Reed
 * @version May 2, 2017
 *
 */
public class ToolShape {
    
    /** Shape. */
    private final Shape myShape;
    /** Thickness. */
    private final int myThick;
    /** Color. */
    private final Color myColor;
    /**Fill.*/
    private boolean myFill;
    
    /**
     * Constructor.
     * @param theShape Shape to hold.
     * @param theThick Thickness to hold.
     * @param theColor Color to hold.
     * @param theFill Fill boolean.
     */
    public ToolShape(final Shape theShape, final int theThick,
                     final Color theColor, final boolean theFill) {
        myShape = theShape;
        myThick = theThick;
        myColor = new Color(theColor.getRed(), theColor.getGreen(), theColor.getBlue());
        myFill = theFill;
    }
    
    /**
     * Returns if it should be filled.
     * @return True to fill, false otherwise
     */
    public boolean isFilled() {
        return myFill;
    }
    
    /**
     * Sets fill boolean.
     * @param theFill True to fill, false otherwise.
     */
    public void setFill(final boolean theFill) {
        myFill = theFill;
    }
    
    /**
     * Getter for shape.
     * @return Returns shape object.
     */
    public Shape getShape() {
        return myShape;
    }
    
    /**
     * Getter for thickness.
     * @return int for Thickness
     */
    public int getThick() {
        return myThick;
    }
    
    /**
     * Getter for color.
     * @return Color
     */
    public Color getColor() {
        return myColor;
    }
}
