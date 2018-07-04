/*
 * Tetris Project
 */
package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JPanel;

/**
 * 
 * Panel that shows next piece in line.
 * @author Jacob Reed
 * @version May 19, 2017
 *
 */
public class GameInfo extends JPanel {

    /**Generated SUID. */
    private static final long serialVersionUID = -904014731331910425L;
    /** BG COLOR. */
    private static final Color BG = new Color(114, 10, 10);
    /** Dimension of panel. */
    private static final Dimension PANE_SIZE = new Dimension(200, 100);
    /** Font. */
    private static final Font FONT = new Font("Cracked", Font.BOLD, 12);
  
    
    /**
     * Constructor.
     */
    public GameInfo() {
        super();
        setBackground(BG);
        setPreferredSize(PANE_SIZE);
    }
    
    /**
     * Paints Info.
     * @param theGraphics Graphics.
     */
    protected void paintComponent(final Graphics theGraphics) {
        super.paintComponent(theGraphics);
        final Graphics2D g2d = (Graphics2D) theGraphics;
        g2d.setFont(FONT);
        g2d.setColor(Color.BLACK);
        //Info
        final int xCord = 10;
        final int yCord = 30;
        final int yMod = 20;
        final int plusFourX = 170;
        final int plusFourY = 30;
        g2d.drawString("1 Line: 40 * n", xCord, yCord);
        g2d.drawString("2 Lines: 100 * n", xCord, yCord + yMod);
        g2d.drawString("3 Lines: 300 * n", xCord, yCord 
                       + yMod * 2);
        g2d.drawString("4 Lines: 300 * n", xCord, yCord + (yMod * 2) + yMod);
        g2d.drawString("+4 per frozen block", plusFourX, plusFourY);
        
    } 

}