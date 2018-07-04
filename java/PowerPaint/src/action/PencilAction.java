/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package action;

import gui.PaintPanel;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.ImageIcon;
import javax.swing.JPanel;
import tools.PencilTool;
import tools.Tool;

/**
 * 
 * Pencil Action.
 * @author Jacob Reed
 * @version May 2, 2017
 *
 */
public class PencilAction extends AbstractAction {

    /**Generated SUID. */
    private static final long serialVersionUID = 3875031744912778266L;
    /** Name. */
    private static final String NAME = "Pencil";
    /**Initial point. */
    private static final Point INIT_POINT = new Point(0, 0);
    /** Paint Panel. */
    private PaintPanel myPanel;
    /** Tool. */
    private final Tool myTool;
    
    /**
     * Constructor.
     * @param thePaintPanel Panel to paint on.
     */
    public PencilAction(final JPanel thePaintPanel) {
        super(NAME, new ImageIcon("images/pencil_bw.gif"));
        putValue(Action.MNEMONIC_KEY, KeyEvent.VK_P);
        putValue(Action.SELECTED_KEY, true);
        putValue(Action.SHORT_DESCRIPTION, NAME);
        myPanel = (PaintPanel) thePaintPanel;
        myTool = new PencilTool(INIT_POINT, INIT_POINT);
    }
    
    @Override
    public void actionPerformed(final ActionEvent theEvent) {
        myPanel.setTool(myTool);
        myPanel.setColors(myPanel.getPrimBackColor(), myPanel.getSecBackColor());
        myPanel.repaint();
    }

}
