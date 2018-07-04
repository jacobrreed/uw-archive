/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package tools;

import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Point2D;

/**
 * Circle Tool.
 * @author Jacob Reed
 * @version Apr 28, 2017
 *
 */
public class CircleTool extends AbstractTool  {
    
    /**
     * Constructor.
     * @param theStart start point.
     * @param theEnd end point.
     */
    public CircleTool(final Point2D theStart, final Point2D theEnd) {
        super(theStart, theEnd);
    }

    @Override
    public Shape getShape() {
        Ellipse2D.Double result = new Ellipse2D.Double();
        
        double minX = Math.min(getStart().getX(), getEnd().getX());
        final double maxX = Math.max(getStart().getX(), getEnd().getX());
        double minY = Math.min(getStart().getY(), getEnd().getY());
        final double maxY = Math.max(getStart().getY(), getEnd().getY());
        //Size
        final double size = Math.min(maxX - minX,  maxY - minY);
        //If statements for quadrants, stops the circle from moving up and down.
        if (minX < getStart().getX()) {
            minX = getStart().getX() - size;
        }
        if (minY < getStart().getY()) {
            minY = getStart().getY() - size;
        }
        //Create circle
        result = new Ellipse2D.Double(minX, minY, size, size);
        return result;
    }
}
