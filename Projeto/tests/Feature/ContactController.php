<?php

namespace Tests\Feature;

use App\Mail\ContactMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_send_contact_email()
    {
        Mail::fake();

        $response = $this->post(route('contact.send'), [
            'email' => 'test@example.com',
            'subject' => 'Test Subject',
            'message' => 'Test Message',
        ]);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Email sent successfully']);

        Mail::assertSent(ContactMail::class, function ($mail) {
            return $mail->hasTo('recipient@example.com');
        });
    }
}
