/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package tools;

import java.awt.Shape;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

/**
 * Rectangle Tool.
 * @author Jacob Reed
 * @version Apr 28, 2017
 *
 */
public class RectangleTool extends AbstractTool {
    /**
     * Constructor.
     * @param theStart Start point.
     * @param theEnd End point.
     */
    public RectangleTool(final Point2D theStart, final Point2D theEnd) {
        super(theStart, theEnd);
    }

    @Override
    public Shape getShape() {
        final Rectangle2D.Double result = new Rectangle2D.Double();
        result.setFrameFromDiagonal(getStart(), getEnd());
        return result;
    }
}
