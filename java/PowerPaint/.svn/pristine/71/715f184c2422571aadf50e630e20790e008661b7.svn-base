/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package tools;

import java.awt.Shape;
import java.awt.geom.GeneralPath;
import java.awt.geom.Point2D;

/**
 * Pencil Tool.
 * @author Jacob Reed
 * @version Apr 28, 2017
 *
 */
public class PencilTool extends AbstractTool  {
    /** Hold drawing of pencil. */
    private GeneralPath myPath;
    
    /**
     * Contructor.
     * @param theStart Starting point.
     * @param theEnd Ending point.
     */
    public PencilTool(final Point2D theStart, final Point2D theEnd) {
        super(theStart, theEnd);
        //Pathing for pencil, stores path of coords.
        myPath = new GeneralPath();
        //Smooths out pencil
        myPath.setWindingRule(GeneralPath.WIND_EVEN_ODD);
    }
    
    @Override
    public void setStart(final Point2D theStart) {
        myPath = new GeneralPath();
        //Start
        myPath.moveTo(theStart.getX(), theStart.getY());
    }
    
    @Override
    public Shape getShape() {
        final Point2D endPoint = getEnd();
        myPath.lineTo(endPoint.getX(), endPoint.getY());
        //GeneralPath is a Shape type.
        return myPath;
    }
}
