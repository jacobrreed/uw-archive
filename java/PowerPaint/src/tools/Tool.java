/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package tools;

import java.awt.Shape;
import java.awt.geom.Point2D;

/**
 * Description.
 * @author Jacob Reed
 * @version Apr 28, 2017
 *
 */
public interface Tool {
    
    /**
     * Sets the start point of tool.
     * @param theStartPoint 2D point
     */
    void setStart(Point2D theStartPoint);
    
    /**
     * Sets the end point of tool.
     * @param theEndPoint Ending point.
     */
    void setEnd(Point2D theEndPoint);
    
    /**
     * Get 2d Point for start point.
     * @return Point of start.
     */
    Point2D getStart();
    
    /**
     * Gets ending point.
     * @return 2D ending point
     */
    Point2D getEnd();
    
    /**
     * Returns drawing shape.
     * @return Shape.
     */
    Shape getShape();
}
