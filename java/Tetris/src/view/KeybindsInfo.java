/*
 * Tetris Project
 */
package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.JPanel;




/**
 * 
 * Panel that shows keybind information.
 * @author Jacob Reed
 * @version May 19, 2017
 *
 */
public class KeybindsInfo extends JPanel {

    /**Generated SUID. */
    private static final long serialVersionUID = 168426035370641970L;
    /** Dimension of panel. */
    private static final Dimension PANE_SIZE = new Dimension(200, 200);
    /** Font. */
    private static final Font FONT = new Font("Cracked", Font.BOLD, 12);
    /** Width of images. */
    private static final int WIDTH = 50;
    /** BG COLOR. */
    private static final Color BG = new Color(114, 10, 10);
    /** Height of images. */
    private static final int HEIGHT = 50;
    /** Width of images. */
    private static final int WIDTH_L = 30;
    /** Height of images. */
    private static final int HEIGHT_L = 30;
    /** Width of images. */
    private static final int WIDTH_S = 110;
    /** Height of images. */
    private static final int HEIGHT_S = 120;
    /**Used for image placements. */
    private static final int ONETEN = 110;
    /**Used for image placements. */
    private static final int ONETWENTY = 120;
    /**Used for image placements. */
    private static final int ONEFORTY = 140;
    /**Used for image placements. */
    private static final int FIFT = 15;
    /**Used for image placements. */
    private static final int ONESIXTY = 160;
    /**Used for image placements. */
    private static final int ONEEIGHTY = 180;
    /**Used for image placements. */
    private static final int FOURTY = 40;
    /**Used for image placements. */
    private static final int FIVE = 5;
    /**Used for image placements. */
    private static final int FIFTY = 50;
    /**Used for image placements. */
    private static final int SEVENTY = 70;
    /**Used for image placements. */
    private static final int SEVENTYFIVE = 75;
    /**Used for image placements. */
    private static final int EIGHTYFIVE = 85;
    /**Used for image placements. */
    private static final int NINETY = 90;
    /**Used for image placements. */
    private static final int ONEHUNDRED = 100;
    /** Left icon. */
    private BufferedImage myLeft;
    /** Right icon. */
    private BufferedImage myRight;
    /** Up icon. */
    private BufferedImage myUp;
    /** Down icon. */
    private BufferedImage myDown;
    /** Spacebar icon. */
    private BufferedImage mySpace;
    /** A icon. */
    private BufferedImage myA;
    /** D icon. */
    private BufferedImage myD;
    /** W icon. */
    private BufferedImage myW;
    /** S icon. */
    private BufferedImage myS;
    
    /**
     * Constructor.
     */
    public KeybindsInfo() {
        super();
        setBackground(BG);
        setPreferredSize(PANE_SIZE);
        getImages();
        createImages();
        this.setLayout(new BorderLayout());
    }
    
    /**
     * Resizes images and saves them.
     */
    private void createImages() {
        myLeft = resizeImage(myLeft, WIDTH, HEIGHT);
        myRight = resizeImage(myRight, WIDTH, HEIGHT);
        myDown = resizeImage(myDown, WIDTH, HEIGHT);
        mySpace = resizeImage(mySpace, WIDTH_S, HEIGHT_S);
        myW = resizeImage(myW, WIDTH_L, HEIGHT_L);
        myA = resizeImage(myA, WIDTH_L, HEIGHT_L);
        myS = resizeImage(myS, WIDTH_L, HEIGHT_L);
        myD = resizeImage(myD, WIDTH_L, HEIGHT_L);
        myUp = resizeImage(myUp, WIDTH, HEIGHT);
    }
    
    /**
     * Generates images from folder.
     */
    private void getImages() {
        //LEFT
        try {
            myLeft = ImageIO.read(new File("./img/left.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        //RIGHT
        try {
            myRight = ImageIO.read(new File("./img/right.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        //DOWN
        try {
            myDown = ImageIO.read(new File("./img/down.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        //UP
        try {
            myUp = ImageIO.read(new File("./img/up.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        //Space
        try {
            mySpace = ImageIO.read(new File("./img/space.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        //W
        try {
            myW = ImageIO.read(new File("./img/w.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        //A
        try {
            myA = ImageIO.read(new File("./img/a.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        //S
        try {
            myS = ImageIO.read(new File("./img/s.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        //D
        try {
            myD = ImageIO.read(new File("./img/d.png"));
        } catch (final IOException e) {
            e.printStackTrace();
        }
        
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
        //LEFT
        g2d.drawString("Move Left: ", FIFT, FOURTY);
        g2d.drawImage(myLeft, null, ONETEN, FIVE);
        g2d.drawImage(myA, null, ONESIXTY, FIFT);
        //RIGHT
        g2d.drawString("Move Right: ", FIFT, SEVENTY);
        g2d.drawImage(myRight, null, ONETEN, FOURTY);
        g2d.drawImage(myD, null, ONESIXTY, FIFTY);
        //DOWN
        g2d.drawString("Move Down: ", FIFT, ONEHUNDRED);
        g2d.drawImage(myDown, null, ONETEN, SEVENTYFIVE);
        g2d.drawImage(myS, null, ONESIXTY, EIGHTYFIVE);
        //Rotate
        g2d.drawString("Rotate: ", FIFT, ONEFORTY);
        g2d.drawImage(myUp, null, ONETEN, ONETEN);
        g2d.drawImage(myW, null, ONESIXTY, ONETWENTY);
        //Drop
        g2d.drawString("Drop: ", FIFT, ONEEIGHTY);
        g2d.drawImage(mySpace, null, NINETY, ONETEN);
    }
    
    /**
     * Resizes Image.
     * @param theImg BufferedImage
     * @param theW Width
     * @param theH Height
     * @return New Image.
     */
    private BufferedImage resizeImage(final BufferedImage theImg, 
                                      final int theW, final int theH) { 
        final Image tmp = theImg.getScaledInstance(theW, theH, Image.SCALE_SMOOTH);
        final BufferedImage dimg = new BufferedImage(theW, theH, BufferedImage.TYPE_INT_ARGB);

        final Graphics2D g2d = dimg.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();

        return dimg;
    }  
}