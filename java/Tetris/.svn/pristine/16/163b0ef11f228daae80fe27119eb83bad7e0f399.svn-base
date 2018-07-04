/*
 * Tetris Project
 */
package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GradientPaint;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.util.Observable;
import java.util.Observer;
import javax.swing.JPanel;
import model.Point;
import model.TetrisPiece;

/**
 * 
 * Panel that shows next piece in line.
 * @author Jacob Reed
 * @version May 19, 2017
 *
 */
public class NextPiecePanel extends JPanel implements Observer {

    /**Generated SUID. */
    private static final long serialVersionUID = 168426035370641970L;
    /** Dimension of panel. */
    private static final Dimension PANE_SIZE = new Dimension(200, 200);
    /** BG COLOR. */
    private static final Color BG = new Color(114, 10, 10);
    /** Size of blocks. */
    private static final int PIECE_SIZE = 30;
    /**Next piece.*/
    private TetrisPiece myNext;
    
    /**
     * Constructor.
     */
    public NextPiecePanel() {
        super();
        setBackground(BG);
        setPreferredSize(PANE_SIZE);
        myNext = null;
    }

    
    /**
     * Painting.
     * @param theGraphics Graphics.
     */
    protected void paintComponent(final Graphics theGraphics) {
        super.paintComponent(theGraphics);
        final Graphics2D g2d = (Graphics2D) theGraphics;
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                             RenderingHints.VALUE_ANTIALIAS_ON);
        final int width = (getWidth() / 3) - 5;
        final int height = (getHeight() / 2) + 27;
        final GradientPaint primary = new GradientPaint(0, 0, Color.RED,
                                                        0, getHeight(), Color.ORANGE);
        g2d.setPaint(primary);
        //FIX rotation not showing up properly? even with correct points.
        if (myNext != null) {
            for (Point p : myNext.getPoints()) {
                final int tempY = -p.y();
                g2d.fillRect((p.x() * PIECE_SIZE) + width, (tempY * PIECE_SIZE) + height, 
                                PIECE_SIZE, PIECE_SIZE);
            }
        }
    }
    

    @Override
    public void update(final Observable theOb, final Object theObject) {
        //if a next piece
        if (theObject instanceof TetrisPiece) {
            myNext = (TetrisPiece) theObject;
            repaint();
        }
    }
    
}
