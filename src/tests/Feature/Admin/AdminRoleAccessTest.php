<?php

namespace Tests\Feature\Admin;

use App\Enums\AdminRole;
use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminRoleAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_dashboard(): void
    {
        $admin = Admin::factory()->create();

        $response = $this->actingAs($admin, 'admin')
            ->get(route('admin.dashboard'));

        $response->assertStatus(200);
    }

    public function test_admin_cannot_access_revenue(): void
    {
        $admin = Admin::factory()->create();

        $response = $this->actingAs($admin, 'admin')
            ->get(route('admin.revenue.index'));

        $response->assertStatus(403);
    }

    public function test_admin_cannot_access_subscriptions(): void
    {
        $admin = Admin::factory()->create();

        $response = $this->actingAs($admin, 'admin')
            ->get(route('admin.subscriptions.index'));

        $response->assertStatus(403);
    }

    public function test_admin_cannot_access_admin_management(): void
    {
        $admin = Admin::factory()->create();

        $response = $this->actingAs($admin, 'admin')
            ->get(route('admin.admins.index'));

        $response->assertStatus(403);
    }

    public function test_super_admin_can_access_revenue(): void
    {
        $superAdmin = Admin::factory()->superAdmin()->create();

        $response = $this->actingAs($superAdmin, 'admin')
            ->get(route('admin.revenue.index'));

        $response->assertStatus(200);
    }

    public function test_super_admin_can_access_subscriptions(): void
    {
        $superAdmin = Admin::factory()->superAdmin()->create();

        $response = $this->actingAs($superAdmin, 'admin')
            ->get(route('admin.subscriptions.index'));

        $response->assertStatus(200);
    }

    public function test_super_admin_can_access_admin_management(): void
    {
        $superAdmin = Admin::factory()->superAdmin()->create();

        $response = $this->actingAs($superAdmin, 'admin')
            ->get(route('admin.admins.index'));

        $response->assertStatus(200);
    }

    public function test_both_roles_can_access_users_management(): void
    {
        $admin = Admin::factory()->create();
        $superAdmin = Admin::factory()->superAdmin()->create();

        $adminResponse = $this->actingAs($admin, 'admin')
            ->get(route('admin.users.index'));

        $superAdminResponse = $this->actingAs($superAdmin, 'admin')
            ->get(route('admin.users.index'));

        $adminResponse->assertStatus(200);
        $superAdminResponse->assertStatus(200);
    }

    public function test_both_roles_can_access_marketplace(): void
    {
        $admin = Admin::factory()->create();
        $superAdmin = Admin::factory()->superAdmin()->create();

        $adminResponse = $this->actingAs($admin, 'admin')
            ->get(route('admin.marketplace.index'));

        $superAdminResponse = $this->actingAs($superAdmin, 'admin')
            ->get(route('admin.marketplace.index'));

        $adminResponse->assertStatus(200);
        $superAdminResponse->assertStatus(200);
    }
}
