/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package tools;

import java.awt.Shape;
import java.awt.geom.Point2D;

/**
 * Abstract tool to implement Tool interface.
 * @author Jacob Reed
 * @version Apr 30, 2017
 *
 */
public abstract class AbstractTool implements Tool {
    /** Holds start point. */
    private Point2D myStart;
    /** Holds end point. */
    private Point2D myEnd;
    
    /**
     * Constructor.
     * @param theStart Starting point.
     * @param theEnd Ending point.
     */
    protected AbstractTool(final Point2D theStart, final Point2D theEnd) {
        myStart = theStart;
        myEnd = theEnd;
    }
    
    @Override
    public void setStart(final Point2D theStart) {
        myStart = theStart;
    }
    
    @Override
    public void setEnd(final Point2D theEnd) {
        myEnd = theEnd;
    }
    
    @Override
    public Point2D getStart() {
        return myStart;
    }
    
    @Override 
    public Point2D getEnd() {
        return myEnd;
    }
    
    @Override
    public abstract Shape getShape();

}
