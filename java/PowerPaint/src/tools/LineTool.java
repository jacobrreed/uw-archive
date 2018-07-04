/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package tools;

import java.awt.Shape;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;

/**
 * Line Tool.
 * @author Jacob Reed
 * @version Apr 28, 2017
 *
 */
public class LineTool extends AbstractTool {

    /**
     * Constructor.
     * @param theStart Start point.
     * @param theEnd End Point.
     */
    public LineTool(final Point2D theStart, final Point2D theEnd) {
        super(theStart, theEnd);
    }

    @Override
    public Shape getShape() {
        final Line2D.Double aLine = new Line2D.Double(getStart(), getEnd());
        return aLine;
    }
}
