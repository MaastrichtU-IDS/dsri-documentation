---
id: faq
title: FAQ - Frequently Asked Questions
---

### How do I get access to DSRI?

The page on [requesting an account](/docs/access-dsri) takes you through the details of logging in an gaining access to project workspaces.

### My project is deleted and gone. Can you restore my project?

DSRI does not keep backups of your projects.
To be resilient in the case of unexpected events, follow the [best practices](/docs/best-practices).
That way, you make sure that your code and your configuration can be re-installed swiftly.

### I accidentally deleted \[...\]. Can you restore it?

DSRI does not provide an automatic backup service. If something got deleted from storage, it is gone.
Make sure that your data is stored in more than one place. That way, you can respond to human and technical error.

### But can I store data persistently?

Yes data and code can be stored persistently which will remain when pods/applications are restarted:
 * see [add a persistent volume](/docs/openshift-storage) to your application. 
 
A backup is still always necessary though as illustrated in the [best practices](/docs/best-practices) page.


### Can I use the DSRI portal with any browser?

We test our portal with Firefox and Chrome. There is the possibility of unexpected behavior with other browsers.
