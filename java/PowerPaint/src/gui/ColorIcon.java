/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package gui;

import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics;
import javax.swing.Icon;

/**
 * 
 * Color Icon.
 * @author Jacob Reed
 * @version May 2, 2017
 *
 */
public class ColorIcon implements Icon {
    /** Height of icon. */
    private static final int HEIGHT = 15;
    /** Width of icon. */
    private static final int WIDTH = 15;
    /**Color of icon. */
    private Color myColor;
    
    /**
     * Constructor.
     * @param theColor Color to set.
     */
    public ColorIcon(final Color theColor) {
        myColor = theColor;
    }
    
    @Override
    public int getIconHeight() {
        return HEIGHT;
    }

    @Override
    public int getIconWidth() {
        return WIDTH;
    }

    @Override
    public void paintIcon(final Component theComp, 
                          final Graphics theGraphics, final int theX,
                          final int theY) {
        theGraphics.setColor(myColor);
        theGraphics.fillRect(theX, theY, WIDTH, HEIGHT);
        //Border color
        theGraphics.setColor(Color.BLACK);
        theGraphics.drawRect(theX, theY, WIDTH, HEIGHT);
        
    }
    
    /**
     * Setter for color.
     * @param theColor Color to set.
     */
    void setColor(final Color theColor) {
        myColor = theColor;
    }
    

}
